/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import StarsShow from "../Shared/Stars/StarsShow";
import { useFormik } from "formik";
import truncateUrl from "../../services/truncateUrl";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAccommodationType } from "../../services/requests";
import Rating from "@mui/material/Rating";
//--------------

const FormThird = ({
  formik,
  saveData,
  accommodTypeOptions,
  setAccommodationArr,
  accommodationArr,
}) => {
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
  // const handleRatingChange = (event, value) => {
  //   formik.setFieldValue("ratingAccommodation", value);
  // };

  const onAddAccommodationClick = () => {
    const { type, link, price, rating, review } = formik.values.data3;
    setAccommodationArr((prev) => [
      ...prev,
      { type, link, price, rating, review },
    ]);
    formik.setFieldValue("data3.type", "");
    formik.setFieldValue("data3.link", "");
    formik.setFieldValue("data3.price", "");
    formik.setFieldValue("data3.rating", null);
    formik.setFieldValue("data3.review", "");
  };
  const handleRemove = (index) => {
    setAccommodationArr((prev) => prev.filter((_, i) => i !== index));
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
          name="data3.rating"
          value={formik.values.data3.rating}
          onChange={(event, value) =>
            formik.setFieldValue("data3.rating", value)
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
      <Button
        type="button"
        variant="contained"
        sx={{ mt: 2 }}
        onClick={onAddAccommodationClick}
      >
        Add
      </Button>
      {accommodationArr.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Added Accommodation</Typography>
          <List>
            {accommodationArr.map((accommodation, index) => (
              <ListItem key={index}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <ListItemText
                    sx={{ display: "flex", gap: "1rem" }}
                    primary={`${accommodation.type} :`}
                  />
                  <span>
                    <a
                      href={accommodation.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {truncateUrl(accommodation.link)}
                    </a>
                  </span>
                  <StarsShow rating={accommodation.rating} isReadOnly={true} />
                  <ListItemText
                    sx={{ display: "flex", gap: "1rem" }}
                    primary={`Price :  ${accommodation.price}`}
                  />
                  <ListItemText
                    sx={{ display: "flex", gap: "1rem" }}
                    primary={accommodation.review}
                  />
                </div>

                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
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
