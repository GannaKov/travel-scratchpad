import styles from "./Forms.module.css";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import { getTripsPurposes } from "../../services/requests";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";

const FormSecond = () => {
  const [purposeOptions, setPurposeOptions] = useState([]);
  const [purposes, setPurposes] = useState([]);

  useEffect(() => {
    getTripsPurposes()
      .then((res) => {
        setPurposeOptions(res);
      })
      .catch((error) => console.log(error.status, error.message));
  }, []);
  // const initialValues = {
  //   purpose: "",
  //   country: "",
  //   city: "",
  // };
  const initialValues = {
    purposes: [],
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

  const handleChange = (event) => {
    setPurposes(event.target.value);
  };

  const handleSubmit = () => {
    console.log("in Submit 2");
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
        <Form>
          <FormControl fullWidth>
            <InputLabel
              id="purpose-label"
              style={{ padding: "0 0.5rem" }}
              className={styles.inputlabelForm}
            >
              Select Purposes
            </InputLabel>
            {/* <Field
              as={Select} */}
            <Select
              labelId="purpose-label"
              id="purpose"
              name="purposes"
              multiple
              value={values.purposes}
              onChange={handleChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {purposeOptions.map((purpose) => (
                <MenuItem key={purpose} value={purpose}>
                  <Checkbox checked={values.purposes.indexOf(purpose) > -1} />
                  <ListItemText primary={purpose} />
                </MenuItem>
              ))}
              {/* </Field> */}
            </Select>
          </FormControl>

          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormSecond;
