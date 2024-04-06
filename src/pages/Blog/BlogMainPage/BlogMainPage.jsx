import styles from "./BlogMainPage.module.css";
import { useNavigate, useLoaderData } from "react-router-dom";
import BlogMainList from "../../../components/BlogComponents/BlogMainList/BlogMainList";

const BlogMainPage = () => {
  const AllTripsList = useLoaderData();
  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>FotoMain</p>
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>Add Travel</p>
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>FiltrMain</p>
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>ListMain</p>
          {AllTripsList && <BlogMainList tripsArr={AllTripsList} />}
        </div>
      </div>
    </div>
  );
};

export default BlogMainPage;
