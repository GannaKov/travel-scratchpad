import styles from "./BlogMainPage.module.css";

const BlogMainPage = () => {
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
        </div>
      </div>
    </div>
  );
};

export default BlogMainPage;
