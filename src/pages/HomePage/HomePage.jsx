/* eslint-disable react/prop-types */
import MainList from "../../components/Shared/MainList/MainList";
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
          {allTripsList && allTripsList.length > 0 ? (
            <MainList tripsArr={allTripsList} />
          ) : (
            <p>No Travels</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
