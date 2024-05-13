/* eslint-disable react/prop-types */

import StarsShow from "../Shared/Stars/StarsShow";

import styles from "./Forms.module.css";
import truncateUrl from "../../services/truncateUrl";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import Rating from "@mui/material/Rating";
import { ButtonsTemplate } from "../Shared/Buttons/Buttons";
//--------------

const FormThird = ({
  formik,
  saveData,
  accommodTypeOptions,
  setAccommodationArr,
  accommodationArr,
}) => {
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
          sx={{ marginBottom: "1.5rem" }}
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
          sx={{ marginBottom: "1.5rem" }}
          id="data3.link"
          value={formik.values.data3.link}
          label="Link"
          variant="outlined"
          onChange={formik.handleChange}
        />
        <TextField
          sx={{ marginBottom: "1.5rem" }}
          id="data3.price"
          label="Price"
          variant="outlined"
          value={
            formik.values.data3.price !== null ? formik.values.data3.price : ""
          }
          onChange={formik.handleChange}
        />
        <div className={styles.ratingWrp}>
          <Rating
            precision={0.5}
            name="data3.rating"
            value={formik.values.data3.rating}
            onChange={(event, value) =>
              formik.setFieldValue("data3.rating", value)
            }
          />
        </div>

        <TextField
          sx={{ marginBottom: "1.5rem" }}
          id="data3.review"
          label="Review"
          value={formik.values.data3.review}
          multiline
          maxRows={4}
          onChange={formik.handleChange}
        />
      </FormControl>

      <ButtonsTemplate
        size="medium"
        variant="contained"
        disabled={!formik.values.data3.type && !formik.values.data3.link}
        onClick={onAddAccommodationClick}
      >
        Add
      </ButtonsTemplate>
      {accommodationArr.length > 0 && (
        <Box mt={4}>
          <p className={styles.subTitle}>Added Accommodation</p>
          <ul>
            {accommodationArr.map((accommodation, index) => (
              <li key={index} className={styles.formInfoItem}>
                <div>
                  <div className={styles.tripText}>
                    {" "}
                    <span className={styles.tripBoldText}>
                      {accommodation.type}:&nbsp;
                    </span>
                    <a
                      href={accommodation.link}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.tripText}
                    >
                      {truncateUrl(accommodation.link)}
                    </a>
                  </div>
                  <div className={styles.tripText}>
                    <StarsShow
                      rating={accommodation.rating}
                      isReadOnly={true}
                    />
                  </div>
                  <div className={styles.tripText}>
                    <span className={styles.tripBoldText}>Price:&nbsp;</span>
                    <span>{accommodation.price}</span>
                  </div>

                  <p className={styles.tripText}>{accommodation.review}</p>
                </div>

                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </li>
            ))}
          </ul>
        </Box>
      )}
      <div>
        <ButtonsTemplate type="submit" size="large">
          Finish now?
        </ButtonsTemplate>
      </div>
      <ButtonsTemplate
        // type="submit"
        size="large"
        onClick={() => saveData(formik.values.data3)}
      >
        Continue
      </ButtonsTemplate>
    </form>
  );
};

export default FormThird;
