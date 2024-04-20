import { useState } from "react";
import { Button, MobileStepper } from "@mui/material";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import FormFirst from "../FormFirst";
import FormSecond from "../FormSecond";
import FormThird from "../FormThird";
import FormFourth from "../FormFourth";
import FormFifth from "../FormFifth";
import FormSixth from "../FormSixth";

const FormStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  console.log("active", activeStep);
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    // Отправить formData на бэкенд
    console.log("Submitted data:", formData);
  };

  return (
    <div>
      <MobileStepper
        variant="dots"
        steps={6}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === 5}
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
      {activeStep === 0 && <FormFirst />}
      {activeStep === 1 && <FormSecond />}
      {activeStep === 2 && <FormThird />}
      {activeStep === 3 && <FormFourth />}
      {activeStep === 4 && <FormFifth />}
      {activeStep === 5 && <FormSixth />}
      {activeStep === 4 && (
        <div>
          <Button onClick={handleSubmit}>Finish</Button>
        </div>
      )}
    </div>
  );
};

export default FormStepper;
