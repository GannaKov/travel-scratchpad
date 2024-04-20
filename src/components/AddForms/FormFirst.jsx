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
const FormFirst = () => {
  const [valueRating, setValueRating] = useState(null);

  const initialValues = {
    title: "",
    dateBeginn: "",
    dateEnd: "",
    rating: 0,
  };
  //validationSchema={FirstFormSchema}
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("Submitted values:", values);
    },
  });
  const handleRatingChange = (event, value) => {
    formik.setFieldValue("rating", value);
  };
  const FirstFormSchema = Yup.object({
    title: Yup.string()
      .max(50, "Must be 15 characters or less")
      .required("Required"),
    dateBeginn: Yup.string()
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
        "Invalid date format (DD.MM.YYYY)"
      )
      .required("Required"),
    dateEnd: Yup.string()
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
        "Invalid date format (DD.MM.YYYY)"
      )
      .required("Required"),
    rating: Yup.number()
      .integer("Rating must be an integer")
      .min(0, "Rating must be between 0 and 5")
      .max(5, "Rating must be between 0 and 5")
      .required("Required"),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          onChange={formik.handleChange}
        />
        <TextField
          id="dateBeginn"
          label="Start Date"
          variant="outlined"
          onChange={formik.handleChange}
          placeholder="DD.MM.YYYY"
        />
        <TextField
          id="dateEnd"
          label="End Date"
          variant="outlined"
          onChange={formik.handleChange}
          placeholder="DD.MM.YYYY"
        />
        <Rating
          precision={0.5}
          name="rating"
          value={formik.values.rating}
          onChange={handleRatingChange}
        />
      </FormControl>
      <Button type="submit">Submit</Button>
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
