/* eslint-disable react/prop-types */
import BlogMainList from "../../components/BlogComponents/BlogMainList/BlogMainList";
import Select from "../../components/Shared/Select/Select";
import styles from "./HomePage.module.css";
import { useNavigate, useLoaderData } from "react-router-dom";

const HomePage = ({
  countriesOptions,
  selectedCountry,
  setSelectedCountry,
}) => {
  const allTripsList = useLoaderData();

  const handleChangeCountry = (event, value) => {
    console.log("in handleChangeCountry ", value);
    setSelectedCountry(value);
  };
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
        <div className={styles.containerBlog}>
          <Select
            selectedValue={selectedCountry}
            handleChange={handleChangeCountry}
            valueOptions={countriesOptions}
          />
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
