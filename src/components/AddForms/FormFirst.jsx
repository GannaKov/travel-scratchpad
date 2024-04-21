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
          onChange={formik.handleChange}
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
          onChange={formik.handleChange}
          error={
            formik.touched.data1?.dateEnd &&
            Boolean(formik.errors.data1?.dateEnd)
          }
          helperText={
            formik.touched.data1?.dateEnd && formik.errors.data1?.dateEnd
          }
          placeholder="DD.MM.YYYY"
        />
        <Rating
          name="data1.ratingTrip"
          value={formik.values.data1.ratingTrip}
          onChange={(event, value) =>
            formik.setFieldValue("data1.ratingTrip", value)
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
