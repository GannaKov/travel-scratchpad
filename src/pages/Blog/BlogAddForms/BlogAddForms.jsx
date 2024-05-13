/* eslint-disable react/prop-types */
import styles from "./BlogAddForms.module.css";

import FormStepper from "../../../components/AddForms/FormStepper/FormStepper";
import GoBack from "../../../components/GoBack/GoBack";
import { useLocation } from "react-router-dom";

const BlogAddForms = ({ countriesOptions }) => {
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/blog-main";

  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <GoBack state={backLinkHref} />
        </div>
      </div>

      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p className={styles.formText}>
            You can add or change data at any time
          </p>
          <FormStepper countriesOptions={countriesOptions} />
        </div>
      </div>
    </div>
  );
};

export default BlogAddForms;
