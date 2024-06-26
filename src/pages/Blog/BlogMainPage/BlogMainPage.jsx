/* eslint-disable react/prop-types */
import styles from "./BlogMainPage.module.css";
import { useNavigate, useLoaderData } from "react-router-dom";
import MainList from "../../../components/Shared/MainList/MainList";

import Select from "../../../components/Shared/Select/Select";
import { ButtonsTemplate } from "../../../components/Shared/Buttons/Buttons";

import CustomMap from "../../../components/CustomMap/CustomMap";
import { APIProvider } from "@vis.gl/react-google-maps";

const BlogMainPage = ({
  countriesOptions,
  selectedCountry,
  setSelectedCountry,
}) => {
  const allOwnTripsList = useLoaderData();
  const navigate = useNavigate();
  const uniqueCountries = [
    ...new Set(allOwnTripsList.flatMap((item) => item.countries)),
  ];

  const handleChangeCountry = (event, value) => {
    setSelectedCountry(value);
  };
  const handleAddBtnClick = () => {
    const from = location.pathname;

    navigate("/add-form", { state: { from } });
  };
  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
            <CustomMap />
          </APIProvider>
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p className={styles.boldText}>
            Horray! You have already visited {uniqueCountries.length}{" "}
            countries!🌸
          </p>
          <p className={styles.boldText}> Do not stop!</p>
        </div>
      </div>

      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <h3 className={styles.subTitle}>Add Your Trip</h3>

          <ButtonsTemplate
            color="darkGreen"
            size="small"
            variant="contained"
            onClick={handleAddBtnClick}
          >
            Add
          </ButtonsTemplate>
        </div>
      </div>
      <div className={styles.sectionLine}></div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog} style={{ display: "flex" }}>
          {/* ===============Country========================================== */}

          {countriesOptions && countriesOptions.length > 0 && (
            <Select
              selectedValue={selectedCountry}
              handleChange={handleChangeCountry}
              valueOptions={countriesOptions}
              label="country"
            />
          )}
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          {allOwnTripsList && allOwnTripsList.length > 0 ? (
            <MainList tripsArr={allOwnTripsList} />
          ) : (
            <p className={styles.subTitle}>Add your trip !</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogMainPage;
