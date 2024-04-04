import styles from "./BlogHomePage.module.css";

const BlogHomePage = () => {
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
          <p>ShotListHome</p>
        </div>
      </div>
    </div>
  );
};

export default BlogHomePage;
