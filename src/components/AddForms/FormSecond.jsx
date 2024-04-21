/* eslint-disable react/prop-types */
import styles from "./Forms.module.css";
//import * as Yup from "yup";
//import { Formik, Field, Form, ErrorMessage } from "formik";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { getTripsPurposes } from "../../services/requests";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
  TextField,
} from "@mui/material";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FormSecond = ({ formik, saveData }) => {
  const [purposeOptions, setPurposeOptions] = useState([]);
  // const [purposes, setPurposes] = useState([]);
  // const [countryOptions, setCountryOptions] = useState([]);
  // const [countryInput, setCountryInput] = useState("");
  //--auto
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  //end auto
  //console.log("formik.values.data2", formik.values.data2);

  useEffect(() => {
    getTripsPurposes()
      .then((res) => {
        setPurposeOptions(res);
      })
      .catch((error) => console.log(error.status, error.message));
    //-- auto
    setLoading(true);
    axios
      .get(
        `https://restcountries.com/v3/all`
        //`https://restcountries.com/v3/name/${value}?match=${value}&fields=name`
      )
      .then((res) => {
        const countryNames = res.data.map((country) => country.name.common);

        setCountriesOptions(countryNames);
      })
      .catch((error) => console.log(error.status, error.message))
      .finally(() => setLoading(false));
  }, []);

  // const initialValues = {
  //   purposes: [],
  //   countries: [],
  //   cities: [],
  // };
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit: (values) => {
  //     console.log("Submitted values:", values);
  //     //city.trim().charAt(0).toUpperCase() + city.slice(1);
  //   },
  // });

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    // limit: 10,
    trim: true,
  });

  // const handlePurposeChange = (event) => {
  //   console.log("in change");
  //   setPurposes(event.target.value);
  // };
  //----- Purposes
  const handlePurposeChange = (event) => {
    formik.setFieldValue("purposes", event.target.value);
  };
  //----- Country
  const handleCountriesAutocompleteChange = (event, value) => {
    formik.setFieldValue("data2.countries", value);
  };
  //----- City
  const handleCitiesChange = (event) => {
    const separator = ",";
    const value = event.target.value;

    const citiesArray = value.split(separator).map(
      (city) => city.trim()
      //   city
      //     .split(", ")
      //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      //     .join(" ")
      //     .trim()
    );

    formik.setFieldValue("data2.cities", citiesArray);
  };
  //const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
  //====================================
  return (
    <form onSubmit={formik.handleSubmit}>
      {/* =============== Purposes ========================================== */}
      <FormControl fullWidth>
        <InputLabel
          id="purpose-label"
          style={{ padding: "0 0.5rem" }}
          className={styles.inputlabelForm}
        >
          Select Purposes
        </InputLabel>

        <Select
          labelId="purpose-label"
          id="data2.purpose"
          name="data2.purposes"
          multiple
          value={formik.values.data2.purposes}
          onChange={formik.handleChange}
          renderValue={(selected) => selected.join(", ")}
        >
          {purposeOptions.map((purpose) => (
            <MenuItem key={purpose} value={purpose}>
              <Checkbox
                checked={formik.values.data2.purposes.indexOf(purpose) > -1}
              />
              <ListItemText primary={purpose} />
            </MenuItem>
          ))}
        </Select>

        {/* ================================================================ */}

        {/* ===============Country========================================== */}
        <Autocomplete
          id="data2.countries"
          name="data2.countries"
          filterOptions={filterOptions}
          multiple
          autoHighlight
          disableCloseOnSelect
          onChange={handleCountriesAutocompleteChange}
          value={formik.values.data2.countries}
          // onChange={formik.handleChange}
          options={countriesOptions}
          getOptionLabel={(option) => option}
          //loading={loading}
          renderOption={(props, option, { selected }) => (
            <Box component="li" {...props}>
              <Checkbox
                // id="data2.countries"
                //  name="data2.countries"
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </Box>
          )}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              id="data2.countries"
              name="data2.countries"
              label="Choose a country"
              placeholder="Countries"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        {/* ======================= Cities =============================== */}
        <TextField
          id="data2.cities"
          name="data2.cities"
          label="Cities"
          multiline
          rows={2}
          value={formik.values.data2.cities.join(", ")}
          onChange={handleCitiesChange}
          variant="outlined"
          fullWidth
          helperText="Enter city names, separating them by commas"
        />
      </FormControl>
      <div>
        <Button type="submit">Finish now?</Button>
      </div>
      <Button type="submit" onClick={() => saveData(formik.values.data2)}>
        Continue
      </Button>
    </form>
  );
};

export default FormSecond;
//https://restcountries.com/v3/name/ger?fields=name&exact=true
