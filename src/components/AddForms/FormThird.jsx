/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { useFormik } from "formik";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";

import { getAccommodationType } from "../../services/requests";
import Rating from "@mui/material/Rating";
//--------------

const FormThird = ({ formik, saveData, accommodTypeOptions }) => {
  // const [accommodTypeOptions, setAccommodTypeOptions] = useState([]);
  // console.log("formik.values.data3", formik.values.data3);

  // useEffect(() => {
  //   getAccommodationType()
  //     .then((res) => setAccommodTypeOptions(res))
  //     .catch((error) => console.log(error.status, error.message));
  // }, []);

  // useEffect(() => {
  //   // При монтировании компонента FormThird, устанавливаем значение Select
  //   if (!formik.values.data3.type && accommodTypeOptions.length > 0) {
  //     // Если значение не установлено и есть доступные опции
  //     const defaultType = accommodTypeOptions.includes("Hotel")
  //       ? "Hotel"
  //       : accommodTypeOptions[0];
  //     formik.setFieldValue("data3.type", defaultType); // Устанавливаем значение по умолчанию
  //   }
  // }, [formik.values.data3.type, accommodTypeOptions, formik]);
  // const initialValues = {
  //   type: "",
  //   link: "",
  //   price: null,
  //   ratingAccommodation: null,
  //   review: "",
  // };
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit: (values) => {
  //     console.log("Submitted values:", values);
  //   },
  // });
  const handleRatingChange = (event, value) => {
    formik.setFieldValue("ratingAccommodation", value);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <InputLabel id="accommodation-type">Accommodation</InputLabel>
        <Select
          labelId="accommodation-type"
          id="data3.type"
          name="data3.type"
          value={formik.values.data3.type}
          label="Accommodation"
          onChange={formik.handleChange}
          defaultValue={accommodTypeOptions[6]}
        >
          {accommodTypeOptions &&
            accommodTypeOptions.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
        </Select>
        <TextField
          id="data3.link"
          value={formik.values.data3.link}
          label="Link"
          variant="outlined"
          onChange={formik.handleChange}
        />
        <TextField
          id="data3.price"
          label="Price"
          variant="outlined"
          value={
            formik.values.data3.price !== null ? formik.values.data3.price : ""
          }
          onChange={formik.handleChange}
        />
        <Rating
          precision={0.5}
          name="data3.ratingAccommodation"
          value={formik.values.data3.ratingAccommodation}
          onChange={(event, value) =>
            formik.setFieldValue("data3.ratingAccommodation", value)
          }
        />
        <TextField
          id="data3.review"
          label="Review"
          value={formik.values.data3.review}
          multiline
          maxRows={4}
          onChange={formik.handleChange}
        />
      </FormControl>
      <div>
        <Button type="submit">Finish now?</Button>
      </div>
      <Button type="submit" onClick={() => saveData(formik.values.data3)}>
        Continue
      </Button>
    </form>
  );
};

export default FormThird;
