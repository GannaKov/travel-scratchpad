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

  const [formData, setFormData] = useState({
    data1: { title: "", dateBeginn: "", dateEnd: "", ratingTrip: 0 },

    data2: { purposes: [], countries: [], cities: [] },
    data3: {
      type: "",
      link: "",
      price: null,
      ratingAccommodation: null,
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
    onSubmit: (values) => {
      console.log("Submitted values:", values);
      //setFormData(values); //????
      //handleNext(); //?????
    },
  });

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
    />,
    <FormFourth key="step4" formik={formik} saveData={saveStepData(4)} />,
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
            disabled={activeStep === steps.length - 1}
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
      {activeStep === 2 && (
        <div>
          <Button onClick={formik.handleSubmit}>Finish</Button>
        </div>
      )}
    </div>
  );
};

export default FormStepper;
