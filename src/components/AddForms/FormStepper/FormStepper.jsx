/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import styles from "./FormStepper.module.css";

import { Button, MobileStepper } from "@mui/material";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import FormFirst from "../FormFirst";
import FormSecond from "../FormSecond";
import FormThird from "../FormThird";
import FormFourth from "../FormFourth";
import FormFifth from "../FormFifth";

import {
  getAccommodationType,
  getCountriesOptions,
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
import GoBack from "../../GoBack/GoBack";

const FormStepper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backLinkHref = location.state ?? "/blog-main";
  const [searchParams, setSearchParams] = useSearchParams();

  const initialMode = searchParams.get("mode") === "true";
  const tripId = searchParams.get("id");
  const [editMode, setEditMode] = useState(initialMode);
  //------
  const [activeStep, setActiveStep] = useState(0);
  //-----
  const [accommodationArr, setAccommodationArr] = useState([]); //use also for edit
  const [expenses, setExpenses] = useState([]); //use also for edit
  const [usefulLinks, setUsefulLinks] = useState([]); //use also for edit
  const [allImages, setAllImages] = useState([]); ////use also for edit??????????
  //-----

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
  const [countriesOptions, setCountriesOptions] = useState([]);
  // ---- Formik -----
  const formik = useFormik({
    initialValues: formData,
    validationSchema: Yup.object({
      // Здесь можно добавить валидацию по необходимости
      data1: Yup.object({
        title: Yup.string().required("Required"),
        dateBeginn: Yup.string().required("Required"),
        dateEnd: Yup.string().required("Required"),
        ratingTrip: Yup.number()
          .min(0, "Min rating is 0")
          .max(5, "Max rating is 5"),
      }),
      // Добавить валидацию для остальных полей по аналогии
    }),
    onSubmit: async (values) => {
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
      // const startDate = new Date(formik.values.data1.dateBeginn);
      // const endDate = new Date(formik.values.data1.dateEnd);

      //---- new Date(formik.values.data1.dateBeginn)
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

      console.log("updatedForBackend", updatedForBackend);
      await formik.setFieldValue(`data2.cities`, newCitiesArr);
      await formik.setValues(updatedValues);

      setFormData(updatedValues);

      //img + backend
      // if (formik.values.data5.mainImage || imgArrForSubmit.length > 0) {
      //   const sliced = imgArrForSubmit.slice(0, 4);
      //   const imagesArr = [formik.values.data5.mainImage, ...sliced];
      //   await formik.setFieldValue(`data5.images`, imagesArr);
      // }
      const sliced = imgArrForSubmit.slice(0, 4);
      const imagesArr = [formik.values.data5.mainImage, ...sliced];
      await formik.setFieldValue(`data5.images`, imagesArr);
      const data = new FormData();
      data.append("data", JSON.stringify(updatedForBackend));
      //const mainFile = formik.values.data5.mainImage;

      console.log("imgArrForSubmit", imgArrForSubmit);
      console.log("imagesArr in stepper", formik.values.data5.images);
      // data.append("main_file", mainFile);

      for (let i = 0; i < imagesArr.length; i++) {
        data.append("image_files", imagesArr[i]);
        console.log("in append", imagesArr[i]);
      }
      if (editMode) {
        await putFormData(tripId, data);
        navigate(`/blog-main/${tripId}`);
      } else {
        await postFormData(data);
        navigate("/blog-main");
      }
    },
  });

  // ---- end  Formik -----
  //-----
  useEffect(() => {
    getAccommodationType()
      .then((res) => setAccommodTypeOptions(res))
      .catch((error) => console.log(error.status, error.message));
    getCountriesOptions()
      .then((result) => {
        const countryNames = result.data.map((country) => country.name.common);
        setCountriesOptions(countryNames);
      })
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
        setAllImages(response.images.slice(1));
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
          data5: { mainImage: response.main_img, images: [] },
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
      //setFileMain={setFileMain}
      //fileMain={fileMain}
      saveData={saveStepData(5)}
      editMode={editMode}
      mainImg={formik.values.data5.mainImage}
      setAllImages={setAllImages} // that for view I will try to change in Form 5
      allImages={allImages} // that for view I  will try to change in Form 5
      setImgArrForSubmit={setImgArrForSubmit}
    />,
  ];

  //   const handleSubmit = () => {
  //     // Отправить formData на бэкенд
  //     console.log("Submitted data:", formData);
  //   };

  return (
    <div>
      <div className={styles.containerBlog}>
        <GoBack state={backLinkHref} />
      </div>
      <MobileStepper
        variant="dots"
        steps={5}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === steps.length}
            // disabled={activeStep === 2} ???
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
      {steps[activeStep]}

      {/* {activeStep === 0 && (
        <div>
          <Button type="submit">Finish</Button>
        </div>
      )} */}
    </div>
  );
};

export default FormStepper;
