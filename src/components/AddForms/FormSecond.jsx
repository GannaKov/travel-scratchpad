/* eslint-disable react/prop-types */
import styles from "./Forms.module.css";

import { useEffect, useState } from "react";
import { getTripsPurposes } from "../../services/requests";

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
  TextField,
  Typography,
} from "@mui/material";
import { ButtonsTemplate } from "../Shared/Buttons/Buttons";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FormSecond = ({ formik, saveData, countriesOptions }) => {
  const [purposeOptions, setPurposeOptions] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTripsPurposes()
      .then((res) => {
        setPurposeOptions(res);
      })
      .catch((error) => console.log(error.status, error.message))
      .finally(() => setLoading(false));
  }, []);

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    // limit: 10,
    trim: true,
  });

  //----- Purposes
  // const handlePurposeChange = (event) => {
  //   formik.setFieldValue("purposes", event.target.value);
  // };
  //----- Country
  const handleCountriesAutocompleteChange = (event, value) => {
    formik.setFieldValue("data2.countries", value);
  };
  //----- City
  const handleCitiesChange = (event) => {
    const separator = ",";
    const value = event.target.value;

    const citiesArray = value.split(separator).map((city) => city.trim());

    formik.setFieldValue("data2.cities", citiesArray);
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
          Select Purposes*
        </InputLabel>

        <Select
          sx={{ marginBottom: "1.5rem" }}
          labelId="purpose-label"
          id="data2.purpose"
          name="data2.purposes"
          multiple
          value={formik.values.data2.purposes}
          onChange={formik.handleChange}
          renderValue={(selected) => selected.join(", ")}
          error={
            formik.touched.data2?.purposes &&
            formik.errors.data2?.purposes &&
            Boolean(formik.errors.data2?.purposes)
          }
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
          sx={{ marginBottom: "1.5rem" }}
          id="data2.countries"
          name="data2.countries"
          filterOptions={filterOptions}
          multiple
          autoHighlight
          disableCloseOnSelect
          onChange={handleCountriesAutocompleteChange}
          value={formik.values.data2.countries}
          options={countriesOptions}
          getOptionLabel={(option) => option}
          error={
            formik.touched.data2?.countries &&
            formik.errors.data2?.countries &&
            Boolean(formik.errors.data2?.countries)
          }
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
          renderInput={(params) => (
            <div>
              {" "}
              <TextField
                {...params}
                id="data2.countries"
                name="data2.countries"
                label="Choose a country*"
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
              {formik.touched.data2?.countries &&
                formik.errors.data2?.countries && (
                  <Typography variant="body2" color="error">
                    {formik.errors.data2?.countries}
                  </Typography>
                )}
            </div>
          )}
        />
        {/* ======================= Cities =============================== */}
        <TextField
          sx={{ marginBottom: "1.5rem" }}
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
        <ButtonsTemplate type="submit" size="large">
          Finish now?
        </ButtonsTemplate>
      </div>
      <ButtonsTemplate
        // type="submit"
        size="large"
        onClick={() => saveData(formik.values.data2)}
      >
        Continue
      </ButtonsTemplate>
    </form>
  );
};

export default FormSecond;
//https://restcountries.com/v3/name/ger?fields=name&exact=true
