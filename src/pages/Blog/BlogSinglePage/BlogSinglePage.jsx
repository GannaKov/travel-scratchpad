import { useNavigate, useLoaderData } from "react-router-dom";
import BlogSingleTrip from "../../../components/BlogComponents/BlogSingleTrip/BlogSingleTrip";
import styles from "./BlogSinglePage.module.css";

const BlogSinglePage = () => {
  const singleTrip = useLoaderData();
  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>Go Back</p>
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>single Map</p>
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>single Edit</p>
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>single Info</p>
          <BlogSingleTrip singleTrip={singleTrip} />
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>single Photos</p>
        </div>
      </div>
    </div>
  );
};

export default BlogSinglePage;
