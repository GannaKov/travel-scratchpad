/* eslint-disable react/prop-types */
import { useState } from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";
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
  // eslint-disable-next-line no-unused-vars
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
                <img src={image} alt="" className={styles.singleMutltyImg} />
                <CancelIcon
                  className="shareCancelImg "
                  onClick={() => {
                    setImagesArr((prev) => prev.filter((t) => t != image));

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
          <div>
            <div className={styles.addImageBtnWrp}>
              <Button type="button" variant="contained" sx={{ mb: 4 }}>
                <label htmlFor="image_files" style={{ cursor: "pointer" }}>
                  {imagesArr.length === 0 ? "Select Images" : "Add Images"}
                </label>
              </Button>
              <input
                style={{ display: "none" }}
                id="image_files"
                type="file"
                onChange={handleMultiUploadClick}
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
