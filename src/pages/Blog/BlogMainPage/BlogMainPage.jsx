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
  console.log("allOwnTripsList", allOwnTripsList);

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
          <p>Add Travel</p>
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog} style={{ display: "flex" }}>
          {/* ===============Country========================================== */}

          {/* <Autocomplete
            id="country"
            autoHighlight
            value={selectedCountry}
            onChange={handleChangeCountry}
            disableCloseOnSelect
            options={countriesOptions}
            getOptionLabel={(option) => option}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label="Choose a country" />
            )}
          /> */}
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
