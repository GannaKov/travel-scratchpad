/* eslint-disable react/prop-types */
import styles from "./BlogAddForms.module.css";
// import { useState } from "react";

import FormStepper from "../../../components/AddForms/FormStepper/FormStepper";
import GoBack from "../../../components/GoBack/GoBack";
import { useLocation } from "react-router-dom";

const BlogAddForms = ({ countriesOptions }) => {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/blog-main";

  // const [activeStep, setActiveStep] = useState(0);

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };
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
        </div>
      </div>
    </div>
  );
};

export default BlogAddForms;
