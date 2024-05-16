/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import styles from "./FormStepper.module.css";

import { MobileStepper } from "@mui/material";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { ButtonsTemplate } from "../../Shared/Buttons/Buttons";

import FormFirst from "../FormFirst";
import FormSecond from "../FormSecond";
import FormThird from "../FormThird";
import FormFourth from "../FormFourth";
import FormFifth from "../FormFifth";

import {
  getAccommodationType,
  getTripById,
  postFormData,
  putFormData,
} from "../../../services/requests";
import {
  handleMonth,
  handleYear,
  handleSeasons,
} from "../../../services/handleDate";
import { useNavigate } from "react-router-dom";

import useAuth from "../../../context/useAuthHook";

const FormStepper = ({ countriesOptions, setIsLoader }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const initialMode = searchParams.get("mode") === "true";
  const tripId = searchParams.get("id");
  const [editMode] = useState(initialMode);
  //------
  const [activeStep, setActiveStep] = useState(0);
  //-----
  const [accommodationArr, setAccommodationArr] = useState([]); //use also for edit
  const [expenses, setExpenses] = useState([]); //use also for edit
  const [usefulLinks, setUsefulLinks] = useState([]); //use also for edit

  //-----
  //main Img for view
  const [mainPhoto, setMainPhoto] = useState("");
  // a lot of images for view
  const [imagesArr, setImagesArr] = useState([]);
  //-------

  //-------
  const [imgArrForSubmit, setImgArrForSubmit] = useState([]);
  const [formData, setFormData] = useState({
    data1: {
      title: "",
      dateBeginn: "",
      dateEnd: "",
      ratingTrip: 0,
      totalAmount: "",
    },

    data2: { purposes: [], countries: [], cities: [] },
    data3: {
      type: "",
      link: "",
      price: null,
      rating: null,
      review: "",
    },
    data4: {
      topic: "",
      link: "",
      item: "",
      amount: null,
      advices: "",
    },
    data5: { mainImage: "", images: [] },
  });

  const [accommodTypeOptions, setAccommodTypeOptions] = useState([]);

  // ---- Formik -----
  const formik = useFormik({
    initialValues: formData,
    validationSchema: Yup.object({
      data1: Yup.object({
        title: Yup.string().required("Required"),
        dateBeginn: Yup.string().required("Required"),
        dateEnd: Yup.string().required("Required"),
        ratingTrip: Yup.number()
          .min(0, "Min rating is 0")
          .max(5, "Max rating is 5"),
      }),
      data2: Yup.object({
        countries: Yup.array()
          .of(Yup.string().required("Required"))
          .min(1, "At least one country is required"),
        purposes: Yup.array()
          .of(Yup.string().required("Required"))
          .min(1, "At least one purpose is required"),
      }),
    }),
    onSubmit: async (values) => {
      setIsLoader(true);
      const newCitiesArr = formik.values.data2.cities
        .filter((city) => city.length > 0)
        .map((city) => city.charAt(0).toUpperCase() + city.slice(1));

      const updatedValues = {
        ...values,
        data2: { ...values.data2, cities: newCitiesArr },
      };
      //=============
      //---- month
      const monthArr = handleMonth(
        formik.values.data1.dateBeginn,
        formik.values.data1.dateEnd
      );

      //---- year
      const yearsArr = handleYear(
        formik.values.data1.dateBeginn,
        formik.values.data1.dateEnd
      );

      //---- seasons

      const seasonsArr = handleSeasons(monthArr);

      const updatedForBackend = {
        years: yearsArr,
        seasons: seasonsArr,
        months: monthArr,
        title: formik.values.data1.title,
        date_start: formik.values.data1.dateBeginn,
        date_end: formik.values.data1.dateEnd,
        travel_rating: formik.values.data1.ratingTrip,
        total_amount: formik.values.data1.totalAmount,
        purpose: formik.values.data2.purposes,
        countries: formik.values.data2.countries,
        destination: newCitiesArr,
        accommodation: accommodationArr,
        expenses: expenses,
        useful_links: usefulLinks,
        advice: formik.values.data4.advices,
      };

      await formik.setFieldValue(`data2.cities`, newCitiesArr);
      await formik.setValues(updatedValues);

      setFormData(updatedValues);

      const data = new FormData();
      data.append("data", JSON.stringify(updatedForBackend));

      // for Adding! not Edit
      if (!editMode) {
        let imagesArr = [];
        if (formik.values.data5.mainImage) {
          imagesArr = [formik.values.data5.mainImage, ...imgArrForSubmit].slice(
            0,
            5
          );
        } else {
          imagesArr = [...imgArrForSubmit].slice(0, 6);
        }

        await formik.setFieldValue(`data5.images`, imagesArr);
        for (let i = 0; i < imagesArr.length; i++) {
          data.append("image_files", imagesArr[i]);
        }
      }
      // ---- end for adding not edit

      if (editMode) {
        let oldImages = [];
        let newImages = [];

        if (formik.values.data5.mainImage) {
          typeof formik.values.data5.mainImage === "string"
            ? oldImages.push(formik.values.data5.mainImage)
            : newImages.push(formik.values.data5.mainImage);
        }

        let isMainImgChanged =
          typeof formik.values.data5.mainImage === "string" ? false : true;
        if (formik.values.data5.images.length > 0) {
          oldImages.push(...formik.values.data5.images);
        }

        if (imgArrForSubmit.length > 0) {
          newImages.push(...imgArrForSubmit);
        }

        const oldImgLength = oldImages.length;

        const sliceFor = 5 - oldImgLength;
        const slicedNewImages = newImages.slice(0, sliceFor);

        for (let i = 0; i < slicedNewImages.length; i++) {
          data.append("image_files", slicedNewImages[i]);
        }

        for (let i = 0; i < oldImages.length; i++) {
          data.append("old_images", oldImages[i]);
        }
        data.append("isMainImgChanged", isMainImgChanged);
      }

      if (editMode) {
        await putFormData(tripId, data, token)
          .then(() => {
            navigate(`/blog-main/${tripId}`);
          })
          .catch((error) => {
            console.log("in submit", error);
            alert("Oooops! Images must be together no more than 4.5 MB");
          })
          .finally(() => setIsLoader(false));
      } else {
        await postFormData(data, token)
          .then(() => {
            // console.log("data", res);

            navigate("/blog-main");
            //setIsLoader(false);
          })
          .catch((error) => {
            console.log("in submit", error);
            alert("Oooops! Images must be together no more than 4.5 MB");
          })
          .finally(() => setIsLoader(false));
      }
    },
  });

  // ---- end  Formik -----

  //-----
  useEffect(() => {
    getAccommodationType()
      .then((res) => setAccommodTypeOptions(res))
      .catch((error) => console.log(error.status, error.message));
  }, []);
  //------- for trip edit

  useEffect(() => {
    const fetchDataForEdit = async () => {
      try {
        const response = await getTripById(tripId);

        setAccommodationArr(response.accommodation);
        setExpenses(response.expenses);
        setUsefulLinks(response.useful_links);

        // For show when Edit !???
        setMainPhoto(response.main_img);
        setImagesArr(response.images.slice(1));

        formik.setValues({
          data1: {
            title: response.title,
            dateBeginn: dayjs(response.date_start).format("DD.MM.YYYY"),
            dateEnd: dayjs(response.date_end).format("DD.MM.YYYY"),
            ratingTrip: response.travel_rating,
            totalAmount: response.total_amount,
          },
          data2: {
            purposes: response.purpose,
            countries: response.countries,
            cities: response.destination,
          },
          data3: {
            type: "",
            link: "",
            price: null,
            rating: null,
            review: "",
          },
          data4: {
            topic: "",
            link: "",
            item: "",
            amount: null,
            advices: response.advice,
          },
          data5: {
            mainImage: response.main_img,
            images: response.images.slice(1),
          },
        });
      } catch (error) {
        console.error("Error fetching data for edit:", error);
      }
    };
    if (editMode) {
      fetchDataForEdit();
    }
  }, [editMode, tripId]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const saveStepData = (step) => {
    return (values) => {
      formik.setFieldValue(`data${step}`, values);
      handleNext();
    };
  };
  const steps = [
    <FormFirst key="step1" formik={formik} saveData={saveStepData(1)} />,
    <FormSecond
      key="step2"
      formik={formik}
      saveData={saveStepData(2)}
      countriesOptions={countriesOptions}
    />,
    <FormThird
      key="step3"
      formik={formik}
      saveData={saveStepData(3)}
      accommodTypeOptions={accommodTypeOptions}
      setAccommodationArr={setAccommodationArr}
      accommodationArr={accommodationArr}
    />,
    <FormFourth
      key="step4"
      formik={formik}
      saveData={saveStepData(4)}
      setExpenses={setExpenses}
      expenses={expenses}
      setUsefulLinks={setUsefulLinks}
      usefulLinks={usefulLinks}
    />,
    <FormFifth
      key="step5"
      formik={formik}
      saveData={saveStepData(5)}
      editMode={editMode}
      setImgArrForSubmit={setImgArrForSubmit}
      mainPhoto={mainPhoto}
      setMainPhoto={setMainPhoto}
      imagesArr={imagesArr}
      setImagesArr={setImagesArr}
    />,
  ];

  return (
    <div className={styles.formWrp}>
      <div className={styles.stepperWrp}>
        <MobileStepper
          variant="dots"
          steps={5}
          position="static"
          activeStep={activeStep}
          sx={{
            flexGrow: 1,
            height: "55px",
            borderRadius: "8px",
            backgroundColor: "orange",
          }}
          nextButton={
            <ButtonsTemplate
              color="white"
              size="large"
              disabled={activeStep === steps.length - 1}
              onClick={handleNext}
            >
              Next
              <KeyboardArrowRight />
            </ButtonsTemplate>
          }
          backButton={
            <ButtonsTemplate
              color="white"
              size="large"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              <KeyboardArrowLeft /> Back
            </ButtonsTemplate>
          }
        />
      </div>
      <div> {steps[activeStep]}</div>
    </div>
  );
};

export default FormStepper;
