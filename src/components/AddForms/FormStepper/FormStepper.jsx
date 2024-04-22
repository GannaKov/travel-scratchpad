import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button, MobileStepper } from "@mui/material";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import FormFirst from "../FormFirst";
import FormSecond from "../FormSecond";
import FormThird from "../FormThird";
import FormFourth from "../FormFourth";
import FormFifth from "../FormFifth";
import FormSixth from "../FormSixth";
import { getAccommodationType } from "../../../services/requests";

const FormStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [accommodationArr, setAccommodationArr] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [usefulLinks, setUsefulLinks] = useState([]);
  const [formData, setFormData] = useState({
    data1: { title: "", dateBeginn: "", dateEnd: "", ratingTrip: 0 },

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
  });

  const [accommodTypeOptions, setAccommodTypeOptions] = useState([]);
  useEffect(() => {
    getAccommodationType()
      .then((res) => setAccommodTypeOptions(res))
      .catch((error) => console.log(error.status, error.message));
  }, []);
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
      console.log("cities1:", formik.values.data2.cities);
      const newCitiesArr = formik.values.data2.cities
        .filter((city) => city.length > 0)
        .map((city) => city.charAt(0).toUpperCase() + city.slice(1));
      console.log("cities2:", newCitiesArr);

      const updatedValues = {
        ...values,
        data2: { ...values.data2, cities: newCitiesArr },
      };
      //=============
      const updatedForBackend = {
        title: formik.values.data1.title,
        travel_rating: formik.values.data1.ratingTrip,
        purpose: formik.values.data2.purposes,
        countries: formik.values.data2.countries,
        destination: formik.values.data2.cities,
        accommodation: accommodationArr,
        expenses: expenses,
        useful_links: usefulLinks,
        advice: formik.values.data4.advices,
      };
      console.log("upd", updatedValues);
      console.log("updatedForBackend", updatedForBackend);
      await formik.setFieldValue(`data2.cities`, newCitiesArr);
      await formik.setValues(updatedValues);

      setFormData(updatedValues);
      console.log("FormData", formData);
      console.log("Submitted values:", values);
      //handleNext(); //?????
    },
  });
  // onSubmit: (values) => {
  //   console.log("Submitted values:", values);
  //   const dataFields = ["data1", "data2", "data3", "data4"];
  //   dataFields.forEach((field) => {
  //     saveStepData(field)(formik.values[field]);
  //   });
  //   setFormData(values);
  //   console.log("FormData", formData);

  // },

  //   const handleChange = (event) => {
  //     const { name, value } = event.target;
  //     formik.setFieldValue(name, value);
  //   };
  // ---- end  Formik -----
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
    <FormSecond key="step2" formik={formik} saveData={saveStepData(2)} />,
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
  ];

  //   const handleSubmit = () => {
  //     // Отправить formData на бэкенд
  //     console.log("Submitted data:", formData);
  //   };

  return (
    <div>
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
