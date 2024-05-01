import styles from "./HomePage.module.css";

const HomePage = () => {
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

export default HomePage;
