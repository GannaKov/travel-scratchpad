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

const FormThird = () => {
  const [accommodTypeOptions, setAccommodTypeOptions] = useState([]);

  useEffect(() => {
    getAccommodationType()
      .then((res) => setAccommodTypeOptions(res))
      .catch((error) => console.log(error.status, error.message));
  }, []);

  const initialValues = {
    type: "",
    link: "",
    price: null,
    rating: null,
    review: 0,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("Submitted values:", values);
    },
  });
  const handleRatingChange = (event, value) => {
    formik.setFieldValue("rating", value);
  };
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
          id="link"
          label="Link"
          variant="outlined"
          onChange={formik.handleChange}
        />
        <TextField
          id="price"
          label="Price"
          variant="outlined"
          onChange={formik.handleChange}
        />
        <Rating
          precision={0.5}
          name="rating"
          value={formik.values.rating}
          onChange={handleRatingChange}
        />
        <TextField
          id="review"
          label="Review"
          multiline
          maxRows={4}
          onChange={formik.handleChange}
        />
      </FormControl>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default FormThird;
