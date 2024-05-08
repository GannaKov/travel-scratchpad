/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Forms.module.css";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useId } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
// import StarsShow from "../Stars/StarsShow";

import { useFormik } from "formik";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";

//--------------------------------------------------------------------
const FormFirst = ({ formik, saveData }) => {
  const handleDateChange = (event) => {
    let targetId = event.target.id;

    let value = event.target.value.replace(/\D/g, ""); // Удалить все не-цифры
    if (value.length > 2) {
      value = `${value.slice(0, 2)}.${value.slice(2)}`;
    }
    if (value.length > 5) {
      value = `${value.slice(0, 5)}.${value.slice(5, 9)}`;
    }
    //console.log("value", value);
    if (targetId === "data1.dateEnd") {
      formik.setFieldValue("data1.dateEnd", value);
    }
    if (targetId === "data1.dateBeginn") {
      formik.setFieldValue("data1.dateBeginn", value);
    }
  };
  return (
    <form onSubmit={formik.handleSubmit} >
      <FormControl fullWidth>
        <TextField
          sx={{ marginBottom: "1.5rem" }}
          id="data1.title"
          name="data1.title"
          label="Title"
          variant="outlined"
          value={formik.values.data1.title}
          onChange={formik.handleChange}
          error={
            formik.touched.data1?.title && Boolean(formik.errors.data1?.title)
          }
          helperText={formik.touched.data1?.title && formik.errors.data1?.title}
        />
        <TextField
          sx={{ marginBottom: "1.5rem" }}
          id="data1.dateBeginn"
          name="data1.dateBeginn"
          label="Start Date"
          variant="outlined"
          value={formik.values.data1.dateBeginn}
          //onChange={formik.handleChange}
          onChange={handleDateChange}
          placeholder="DD.MM.YYYY"
          error={
            formik.touched.data1?.dateBeginn &&
            Boolean(formik.errors.data1?.dateBeginn)
          }
          helperText={
            formik.touched.data1?.dateBeginn && formik.errors.data1?.dateBeginn
          }
        />
        <TextField
          sx={{ marginBottom: "1.5rem" }}
          id="data1.dateEnd"
          name="data1.dateEnd"
          label="End Date"
          variant="outlined"
          value={formik.values.data1.dateEnd}
          // onChange={formik.handleChange}
          onChange={handleDateChange}
          error={
            formik.touched.data1?.dateEnd &&
            Boolean(formik.errors.data1?.dateEnd)
          }
          helperText={
            formik.touched.data1?.dateEnd && formik.errors.data1?.dateEnd
          }
          placeholder="DD.MM.YYYY"
        />
        <div className={styles.ratingWrp}>
          <Rating
            precision={0.5}
            name="data1.ratingTrip"
            value={formik.values.data1.ratingTrip}
            onChange={(event, value) =>
              formik.setFieldValue("data1.ratingTrip", value)
            }
          />
        </div>

        <TextField
          sx={{ marginBottom: "1.5rem" }}
          id="data1.totalAmount"
          name="data1.totalAmount"
          label="Total Amount"
          variant="outlined"
          value={formik.values.data1.totalAmount}
          onChange={formik.handleChange}
          error={
            formik.touched.data1?.totalAmount &&
            Boolean(formik.errors.data1?.totalAmount)
          }
          helperText={
            formik.touched.data1?.totalAmount &&
            formik.errors.data1?.totalAmount
          }
        />
      </FormControl>

      <div>
        <Button type="submit">Finish now?</Button>
      </div>
      <Button type="submit" onClick={() => saveData(formik.values.data1)}>
        Continue
      </Button>
    </form>
  );
};

export default FormFirst;
