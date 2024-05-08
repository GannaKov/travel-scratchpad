/* eslint-disable react/prop-types */
import styles from "./BlogAddForms.module.css";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

import FormStepper from "../../../components/AddForms/FormStepper/FormStepper";
import GoBack from "../../../components/GoBack/GoBack";

const BlogAddForms = ({ countriesOptions }) => {
  const backLinkHref = location.state?.from ?? "/blog-main";
  // console.log("backLinkHref", backLinkHref);
  // console.log("location.state", location.state);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <GoBack state={backLinkHref} />
        </div>
      </div>

      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <FormStepper countriesOptions={countriesOptions} />
          {/* <MobileStepper
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
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
          {activeStep === 0 && <FormFirst />}
          {activeStep === 1 && <FormSecond />}
          {activeStep === 2 && <FormThird />}
          {activeStep === 3 && <FormFourth />}
          {activeStep === 4 && <FormFifth />}
          {activeStep === 5 && <FormSixth />} */}
        </div>
      </div>
    </div>
  );
};

export default BlogAddForms;
