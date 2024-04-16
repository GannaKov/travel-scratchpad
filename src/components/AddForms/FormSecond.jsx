import styles from "./Forms.module.css";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
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
  const [purposes, setPurposes] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [countryInput, setCountryInput] = useState("");
  //--auto
  const [options, setOptions] = useState([]);
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

        setOptions(countryNames);
      })
      .catch((error) => console.log(error.status, error.message))
      .finally(() => setLoading(false));
    //end auto
  }, []);

  const handleCountrySearch = async (value) => {
    setCountryInput(value);
    try {
      if (value != "") {
        const response = await axios.get(
          // `https://restcountries.com/v3/name/${value}`
          `https://restcountries.com/v3/name/${value}?match=${value}&fields=name`
        );

        const countries = response.data.map((country) => ({
          label: country.name.common,
          value: country.name.common,
        }));
        setCountryOptions(countries);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  // const initialValues = {
  //   purpose: "",
  //   country: "",
  //   city: "",
  // };
  const initialValues = {
    purposes: [],
    country: "",
  };
  // const SecondFormSchema = Yup.object({
  //   purpose: Yup.string()
  //     .max(50, "Must be 15 characters or less")
  //     .required("Required"),
  //   country: Yup.string()
  //     .max(50, "Must be 15 characters or less")
  //     .required("Required"),
  //   city: Yup.string()
  //     .max(50, "Must be 15 characters or less")
  //     .required("Required"),
  // });
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    // limit: 10,
    trim: true,
  });

  const handleChange = (event) => {
    console.log("in change");
    setPurposes(event.target.value);
  };

  const handleSubmit = () => {
    console.log("in Submit 2");
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {/* {({ values, handleChange }) => ( */}
      <Form>
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
            value={purposes}
            onChange={handleChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {purposeOptions.map((purpose) => (
              <MenuItem key={purpose} value={purpose}>
                <Checkbox checked={purposes.indexOf(purpose) > -1} />
                <ListItemText primary={purpose} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* <FormControl fullWidth>
          <label htmlFor="country" id="country-label">
            Select Country
          </label>
          <Field
            list="countries"
            name="country"
            type="text"
            value={countryInput}
            onChange={(e) => handleCountrySearch(e.target.value)}
          />

          <datalist id="countries">
            {countryOptions.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </datalist>
        </FormControl> */}
        <Autocomplete
          filterOptions={filterOptions}
          multiple
          autoHighlight
          disableCloseOnSelect
          // value={inputValue}
          // onChange={(event, newValue) => setInputValue(newValue)}
          // inputValue={inputValue}
          // onInputChange={handleInputChange}
          options={options}
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
          // renderInput={(params) => (
          //   <TextField
          //     {...params}
          //     label="Country"
          //     variant="outlined"
          //     InputProps={{
          //       ...params.InputProps,
          //       endAdornment: (
          //         <>
          //           {loading ? (
          //             <CircularProgress color="inherit" size={20} />
          //           ) : null}
          //           {params.InputProps.endAdornment}
          //         </>
          //       ),
          //     }}
          //   />
          // )}
        />
        {/* <Button type="submit">Submit</Button> */}
      </Form>
      {/* )} */}
    </Formik>
  );
};

export default FormSecond;
//https://restcountries.com/v3/name/ger?fields=name&exact=true
