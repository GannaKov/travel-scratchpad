import styles from "./BlogAddForms.module.css";
import FormFirst from "../../../components/AddForms/FormFirst";

const BlogAddForms = () => {
  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <FormFirst />
          <div className={styles.btnWrp}>
            <button type="button">Prev</button>
            <button type="button">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAddForms;
