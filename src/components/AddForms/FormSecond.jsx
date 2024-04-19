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
  Input,
} from "@mui/material";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FormSecond = () => {
  const [purposeOptions, setPurposeOptions] = useState([]);
  // const [purposes, setPurposes] = useState([]);
  // const [countryOptions, setCountryOptions] = useState([]);
  // const [countryInput, setCountryInput] = useState("");
  //--auto
  const [countriesOptions, setCountriesOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  //end auto

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
    //end auto
  }, []);

  const initialValues = {
    purposes: [],
    countries: [],
    cities: [],
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("Submitted values:", values);
    },
  });

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
    formik.setFieldValue("countries", value);
  };
  //----- City
  const handleCitiesChange = (event) => {
    const separator = ",";
    const value = event.target.value;
    const citiesArray = value.split(separator).map((city) => city.trim());
    formik.setFieldValue("cities", citiesArray);
  };

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
          id="purpose"
          name="purposes"
          multiple
          // value={purposes}
          // onChange={handlePurposeChange}
          value={formik.values.purposes}
          onChange={handlePurposeChange}
          renderValue={(selected) => selected.join(", ")}
        >
          {purposeOptions.map((purpose) => (
            <MenuItem key={purpose} value={purpose}>
              <Checkbox
                checked={formik.values.purposes.indexOf(purpose) > -1}
              />
              <ListItemText primary={purpose} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* ================================================================ */}

      {/* ===============Country========================================== */}
      <Autocomplete
        filterOptions={filterOptions}
        multiple
        autoHighlight
        disableCloseOnSelect
        // value={inputValue}
        // onChange={(event, newValue) => setInputValue(newValue)}
        // inputValue={inputValue}
        // onInputChange={handleInputChange}
        onChange={handleCountriesAutocompleteChange}
        options={countriesOptions}
        getOptionLabel={(option) => option}
        //loading={loading}
        renderOption={(props, option, { selected }) => (
          <Box component="li" {...props}>
            <Checkbox
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
            id="countries"
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
        id="cities"
        name="cities"
        label="Города"
        multiline
        rows={3}
        value={formik.values.cities.join(", ")}
        onChange={handleCitiesChange}
        variant="outlined"
        fullWidth
        helperText="Введите названия городов, разделяя их запятыми или другим разделителем"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FormSecond;
//https://restcountries.com/v3/name/ger?fields=name&exact=true
