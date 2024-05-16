/* eslint-disable react/prop-types */
import styles from "./BlogAddForms.module.css";

import FormStepper from "../../../components/AddForms/FormStepper/FormStepper";
import GoBack from "../../../components/GoBack/GoBack";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Loader from "../../../components/Shared/Loader/Loader";

const BlogAddForms = ({ countriesOptions }) => {
  const [isLoader, setIsLoader] = useState(false);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/blog-main";

  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <GoBack state={backLinkHref} />
        </div>
      </div>
      <div className={styles.loaderWrp}>{isLoader && <Loader />}</div>

      <div className={styles.sectionBlog}>
        {!isLoader && (
          <div className={styles.containerBlog}>
            <p className={styles.formText}>
              You can add or change data at any time
            </p>
            <FormStepper
              countriesOptions={countriesOptions}
              setIsLoader={setIsLoader}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAddForms;
