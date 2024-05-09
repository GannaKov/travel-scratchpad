/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import styles from "./Forms.module.css";
import { ButtonsTemplate } from "../Shared/Buttons/Buttons";

const FormFifth = ({
  formik,

  setImgArrForSubmit,
  mainPhoto,
  setMainPhoto,
  imagesArr,
  setImagesArr,
}) => {
  //main Img for view
  // const [mainPhoto, setMainPhoto] = useState(formik.values.data5.mainImage);

  // a lot of images for view
  // const [imagesArr, setImagesArr] = useState(formik.values.data5.images);

  const [loading, setLoading] = useState(false);

  const handleUploadClick = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setMainPhoto(reader.result); //view

        formik.setFieldValue("data5.mainImage", file); //file
      };
    }
  };
  const handleMultiUploadClick = async (event) => {
    try {
      const files = event.target.files;

      if (files && files.length > 6) {
        alert(`Only 6 images will be upladed`);
      }
      if (files) {
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = function () {
            setImagesArr((prev) => [...prev, reader.result]); //view
          };
        });
        setImgArrForSubmit((prev) => [...prev, ...Array.from(files)]); //files or formik.images?
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <form onSubmit={formik.handleSubmit}>
        <p className={styles.addImageText}>Add your cover image</p>
        {!mainPhoto && (
          <>
            <div className={styles.addImageBtnWrp}>
              <Button type="button" variant="contained" sx={{ mb: 4 }}>
                <label htmlFor="main_file" style={{ cursor: "pointer" }}>
                  Select Cover Image
                </label>
              </Button>
              <input
                style={{ display: "none" }}
                id="main_file"
                type="file"
                onChange={handleUploadClick}
                multiple={false}
                name="main_file"
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
          </>
        )}
        {mainPhoto && (
          <div className={styles.imgContainer}>
            <img src={mainPhoto} className={styles.mainImg} alt="Cover Image" />
            <CancelIcon
              onClick={() => {
                setMainPhoto(null);
                formik.setFieldValue("data5.mainImage", "");
              }}
            />
          </div>
        )}
        {/* Multi Files Show*/}

        {imagesArr.length > 0 && (
          <div className={styles.multyImagesContainer}>
            {imagesArr.map((image, ind) => (
              <div key={ind} className={styles.singleMutltyImgWrp}>
                {/* <p>{ind + 1} </p> */}
                <img src={image} alt="" className={styles.singleMutltyImg} />
                <CancelIcon
                  className="shareCancelImg "
                  onClick={() => {
                    setImagesArr((prev) => prev.filter((t) => t != image));
                    //setAllImages((prev) => prev.filter((t) => t != image));
                    formik.setFieldValue(
                      "data5.images",
                      formik.values.data5.images.filter((t) => t !== image)
                    );
                  }}
                />{" "}
              </div>
            ))}
          </div>
        )}

        {/* Multi Files Input */}
        <p className={styles.addImageText}>You can add 6 images</p>
        {imagesArr.length <= 5 && (
          // {allImages.length <= 3 && (
          <div>
            <div className={styles.addImageBtnWrp}>
              {/* <label
                htmlFor="image_files"
                className="btn-grey"
                style={{ cursor: "pointer" }}
              >
                {imagesArr.length === 0 ? "Select files" : "Add files"}
              </label> */}
              <Button type="button" variant="contained" sx={{ mb: 4 }}>
                <label htmlFor="image_files" style={{ cursor: "pointer" }}>
                  {imagesArr.length === 0 ? "Select Images" : "Add Images"}
                </label>
              </Button>
              <input
                style={{ display: "none" }}
                id="image_files"
                type="file"
                // onChange={handleSelectFile}
                onChange={handleMultiUploadClick}
                // value={formik.values.data5.mainImage}
                multiple
                name="image_files"
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
          </div>
        )}
        <div className={styles.addImageBtnWrp}>
          <ButtonsTemplate type="submit" size="large" variant="outlined">
            Finish
          </ButtonsTemplate>
        </div>
      </form>
    </div>
  );
};

export default FormFifth;
