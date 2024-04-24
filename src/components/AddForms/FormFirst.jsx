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
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
//--------------------------------------------------------------------
const FormFirst = ({ formik, saveData }) => {
  //const [valueRating, setValueRating] = useState(null);

  // const initialValues = {
  //   title: "",
  //   dateBeginn: "",
  //   dateEnd: "",
  //   ratingTrip: 0,
  // };
  //validationSchema={FirstFormSchema}
  // const formik = useFormik({
  //   initialValues,
  //   onSubmit: (values) => {
  //     console.log("Submitted values:", values);
  //   },
  // });
  // const handleRatingChange = (event, value) => {
  //   formik.setFieldValue("data1.ratingTrip", value);
  // };
  // const FirstFormSchema = Yup.object({
  //   title: Yup.string()
  //     .max(50, "Must be 15 characters or less")
  //     .required("Required"),
  //   dateBeginn: Yup.string()
  //     .matches(
  //       /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
  //       "Invalid date format (DD.MM.YYYY)"
  //     )
  //     .required("Required"),
  //   dateEnd: Yup.string()
  //     .matches(
  //       /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
  //       "Invalid date format (DD.MM.YYYY)"
  //     )
  //     .required("Required"),
  //   ratingTrip: Yup.number()
  //     .integer("Rating must be an integer")
  //     .min(0, "Rating must be between 0 and 5")
  //     .max(5, "Rating must be between 0 and 5")
  //     .required("Required"),
  // });
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
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <TextField
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
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DemoItem label="Mobile variant">
              <DatePicker label="Basic date picker" />
            </DemoItem>
            <DemoItem label="Desktop variant">
              <DesktopDatePicker />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider> */}
        <Rating
          precision={0.5}
          name="data1.ratingTrip"
          value={formik.values.data1.ratingTrip}
          onChange={(event, value) =>
            formik.setFieldValue("data1.ratingTrip", value)
          }
        />
        <TextField
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

    // <div className={styles.fildsInRowWrp}>
    //   <div className={styles.inputLabelColumnWrp}>
    //     <label htmlFor="dateBeginn">Start Date</label>
    //     <Field name="dateBeginn" type="text" placeholder="DD.MM.YYYY" />
    //   </div>

    // <div className={styles.inputLabelColumnWrp}>
    //   <label htmlFor="dateEnd">End Date</label>
    //   <Field name="dateEnd" type="text" placeholder="DD.MM.YYYY" />
    // </div>
    // </div>
    // <div className={styles.inputLabelColumnWrp}>
    //   <label htmlFor="rating">Rating</label>
    //   {/* <StarsShow
    //     isReadOnly={false}
    //     handleRatingChange={handleRatingChange}
    //     rating={valueRating}
    //   /> */}
    //   <Rating
    //     precision={0.5}
    //     name="simple-controlled"
    //     value={valueRating}
    //     onChange={(event, newValue) => {
    //       setValueRating(newValue);
    //     }}
    //   />
  );
};

export default FormFirst;
