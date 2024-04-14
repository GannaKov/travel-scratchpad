import styles from "./Forms.module.css";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useId } from "react";

const FormFirst = () => {
  const initialValues = {
    title: "",
    dateBeginn: "",
    dateEnd: "",
    rating: "",
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

  const handleSubmit = () => {
    console.log("in Submit 1");
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FirstFormSchema}
    >
      <Form className={styles.formWrp}>
        <div className={styles.inputLabelColumnWrp}>
          {" "}
          <label htmlFor="title">Title</label>
          <Field name="title" type="text" />
        </div>

        <div className={styles.fildsInRowWrp}>
          <div className={styles.inputLabelColumnWrp}>
            <label htmlFor="dateBeginn">Start Date</label>
            <Field name="dateBeginn" type="text" placeholder="DD.MM.YYYY" />
          </div>

          <div className={styles.inputLabelColumnWrp}>
            <label htmlFor="dateEnd">End Date</label>
            <Field name="dateEnd" type="text" placeholder="DD.MM.YYYY" />
          </div>
        </div>
        <div className={styles.inputLabelColumnWrp}>
          <label htmlFor="rating">Rating</label>
          <Field
            name="rating"
            type="number"
            placeholder="Rate your trip from 0 to 5"
            min="0"
            max="5"
            step="1"
          />
        </div>
      </Form>
    </Formik>
  );
};

export default FormFirst;
