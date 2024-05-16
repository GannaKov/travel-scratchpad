import styles from "./Loader.module.css";
import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionNotFound}>
        <div className={styles.containerNotFound}>
          <p className={styles.notFoundSubText}>Please wait. </p>
          <div className={styles.loaderWrp}>
            <RingLoader color="#ffffff" size={80} />
          </div>
          <p className={styles.notFoundSubText}>
            We are processing your data...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
