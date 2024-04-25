/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./GoBack.module.css";

const GoBack = ({ state }) => {
  return (
    <Link className={styles.goBackLink} to={state}>
      <button type="button" className={styles.goBackBtn}>
        &larr;&nbsp;Go Back
      </button>
    </Link>
  );
};

export default GoBack;
