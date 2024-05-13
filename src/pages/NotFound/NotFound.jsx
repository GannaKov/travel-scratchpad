/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = ({ text }) => {
  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionNotFound}>
        <div className={styles.containerNotFound}>
          <p className={styles.notFoundText}>WHOOPS… PAGE NOT FOUND </p>
          <p className={styles.notFoundSubText}>{text}</p>
        </div>
        <Link className={styles.notFoundLink} to="/">
          To Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
