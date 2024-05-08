/* eslint-disable react/prop-types */
import styles from "./BlogMainPage.module.css";
import { useNavigate, useLoaderData } from "react-router-dom";
import MainList from "../../../components/Shared/MainList/MainList";

import Autocomplete from "@mui/material/Autocomplete";

import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Select from "../../../components/Shared/Select/Select";

const BlogMainPage = ({
  countriesOptions,
  selectedCountry,
  setSelectedCountry,
}) => {
  const allOwnTripsList = useLoaderData();
  const uniqueCountries = [
    ...new Set(allOwnTripsList.flatMap((item) => item.countries)),
  ];
  console.log("uniqueCountries", uniqueCountries);

  // useEffect(() => {
  //   // После загрузки данных сбрасываем selectedCountry на null
  //   setSelectedCountry(null);
  // }, [allOwnTripsList, setSelectedCountry]);

  const handleChangeCountry = (event, value) => {
    setSelectedCountry(value);
  };

  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>FotoMain</p>
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
          <p>Add Travel</p>
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog} style={{ display: "flex" }}>
          {/* ===============Country========================================== */}

          <Select
            //selectedValue, handleChange, valueOptions
            selectedValue={selectedCountry}
            handleChange={handleChangeCountry}
            valueOptions={countriesOptions}
          />
          {/* <Button variant="contained" color="primary">
            Search
          </Button> */}
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          {allOwnTripsList && allOwnTripsList.length > 0 ? (
            <MainList tripsArr={allOwnTripsList} />
          ) : (
            <p>No Travels</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogMainPage;
