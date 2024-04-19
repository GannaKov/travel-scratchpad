import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material/Autocomplete";

import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
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
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { getAccommodationType } from "../../services/requests";
//--------------
import axios from "axios";
import Box from "@mui/material/Box";

import { number } from "yup";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
//-----------------
//-----------------
const FormThird = () => {
  const [accommodTypeOptions, setAccommodTypeOptions] = useState([]);

  useEffect(() => {
    getAccommodationType()
      .then((res) => setAccommodTypeOptions(res))
      .catch((error) => console.log(error.status, error.message));
  }, []);

  const initialValues = {
    type: "Apartment",
    link: "",
    price: null,
    rating: null,
    review: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("Submitted values:", values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <InputLabel id="accommodation-type">Accommodation</InputLabel>
        <Select
          labelId="accommodation-type"
          id="type"
          name="type"
          value={formik.values.type}
          label="Accommodation"
          onChange={formik.handleChange}
        >
          {accommodTypeOptions &&
            accommodTypeOptions.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </form>
  );
};

export default FormThird;
