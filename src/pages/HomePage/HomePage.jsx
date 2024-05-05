import BlogMainList from "../../components/BlogComponents/BlogMainList/BlogMainList";
import styles from "./HomePage.module.css";
import { useNavigate, useLoaderData } from "react-router-dom";

const HomePage = () => {
  const allTripsList = useLoaderData();
  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>MapHome</p>
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>Add Travel</p>
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          {allTripsList && <BlogMainList tripsArr={allTripsList} />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
