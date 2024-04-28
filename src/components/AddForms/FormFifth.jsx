/* eslint-disable react/prop-types */
import { useState } from "react";
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

const FormFifth = ({ formik, saveData, editMode, mainImg }) => {
  const [img, setImg] = useState(null);
  const [imagesArr, setImagesArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainPhoto, setMainPhoto] = useState(mainImg);

  // const handleSelectFile = (e) => {
  //   setImg(e.target.files[0]);
  //   console.log("img", e.target.files[0]);
  // };

  const handleUploadClick = (event) => {
    const file = event.target.files[0];
    console.log("file", file);
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setImg(reader.result);

        formik.setFieldValue("data5.mainImage", file);
      };
    }
  };
  const handleMultiUploadClick = async (event) => {
    try {
      const files = event.target.files;
      console.log("files", typeof files);
      let imgArr = [];
      if (files && files.length > 4) {
        alert(`Only 4 images will be upladed`);
        return;
      }
      if (files) {
        imgArr = Array.from(files);
        console.log("files", imgArr);
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = function () {
            setImagesArr((prev) => [...prev, reader.result]);
          };
        });
        //  formik.setFieldValue("data5.images", imgArr);
      }

      // formik.setFieldValue("data5.mainImage", file);
      //     };
      //   });
      // }

      //   setLoading(true);
      //   const data = new FormData();
      //   data.append("main_file", file);
      //   const res = await axios.post("http://localhost:6000/upload", data);
      //   setRes(res.data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      {img && (
        <div className="shareImgContainer">
          {/* <img src={URL.createObjectURL(img)} alt="" className="shareImg" /> */}
          <img src={img} style={{ width: 300 }} alt="" className="shareImg" />
          <CancelIcon
            className="shareCancelImg "
            onClick={() => {
              setImg(null);
              formik.setFieldValue("data5.mainImage", "");
            }}
          />
        </div>
      )}
      {imagesArr.length > 0 &&
        imagesArr.map((image, ind) => (
          <div key={ind} className="shareImgContainer">
            <p>{ind} </p>
            {/* <img src={URL.createObjectURL(img)} alt="" className="shareImg" /> */}
            <img
              src={image}
              style={{ width: 300 }}
              alt=""
              className="shareImg"
            />
            <CancelIcon
              className="shareCancelImg "
              onClick={() => {
                setImagesArr((prev) => prev.filter((t) => t != image));
                // formik.setFieldValue("data5.mainImage", "");
              }}
            />
          </div>
        ))}
      {editMode && mainPhoto && (
        <div className="shareImgContainer">
          <img
            src={mainImg}
            style={{ width: 300 }}
            alt=""
            className="shareImg"
          />
          <CancelIcon
            className="shareCancelImg "
            onClick={() => {
              setImg(null);
              formik.setFieldValue("data5.mainImage", "");
              setMainPhoto(null);
            }}
          />
        </div>
      )}
      {/* One File Input */}

      <form onSubmit={formik.handleSubmit}>
        {!img && !mainPhoto && (
          <>
            <div>
              {" "}
              <label
                htmlFor="main_file"
                className="btn-grey"
                style={{ cursor: "pointer" }}
              >
                Select main file
              </label>
              <input
                style={{ display: "none" }}
                id="main_file"
                type="file"
                // onChange={handleSelectFile}
                onChange={handleUploadClick}
                // value={formik.values.data5.mainImage}
                multiple={false}
                name="main_file"
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
          </>
        )}
        {/* Multi Files Input */}
        {imagesArr.length <= 3 && (
          <div>
            <div>
              <label
                htmlFor="image_files"
                className="btn-grey"
                style={{ cursor: "pointer" }}
              >
                {imagesArr.length === 0 ? "Select files" : "Add files"}
              </label>
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
            <Button type="submit">Finish now?</Button>
          </div>
        )}
      </form>

      {/* {img && (
        <>
          <button onClick={handleUpload} className="btn-green">
            {loading ? "uploading..." : "upload to cloudinary"}
          </button>
        </>
      )} */}
    </div>
  );
};

export default FormFifth;

{
  /* <FilePicker onClick={() => document.querySelector(".input-file").click()}>
  <PhotoContainer>{image && <Photo src={image} alt="photo" />}</PhotoContainer>
  <InputFile
    required={true}
    type="file"
    className="input-file"
    accept="image/*"
    onChange={handleUploadClick}
  />
</FilePicker>; */
}
// const handleUploadClick = (event) => {
//   const file = event.target.files[0];
//   const reader = new FileReader();
//   if (file) {
//     reader.readAsDataURL(file);
//     reader.onloadend = function (e) {
//       setImage(reader.result);
//       onChange({ img: event.target.files[0] });
//     };
//   }
// };
//  async function addRecipe(e) {
//     e.preventDefault();
//     if (image) {
//       data.append('img', image);
//     } else return Notiflix.Notify.warning('Image field is empty');
//  if (data) {
//      queryBackEnd.queryAddRecipe(data)
//         .then(status => {
//           if (status === 200) {
//             navigate('/my');
//           }
//         })
// const queryAddRecipe = async (data) => {
//   try {
//     const add = await instanceBacEnd.post("/ownRecipes", data, {
//       headers: {
//         "Content-type": "multipart/form-data",
//       },
//     });
//     return add.status;
//   } catch (err) {
//     console.log(err.response.data.message);
//     return err.response.data.message;
//   }
// };
// router.post(
//   "/",
//   authorizationMiddleware,
//   uploadImgRecipe,
//   validateBody(addRecipeSchema),
//   addRecipe
// );
// const multer = require("multer");
// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const { v4: uuidv4 } = require("uuid");

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const recipeImgParams = {
//   dimensions: {
//     width: 300,
//     height: 323,
//   },
//   maxFileSize: 1000000,
//   acceptableFileTypes: ["jpg", "png"],
// };

// const multerImgRecipe = new CloudinaryStorage({
//   cloudinary,
//   params: (req, file) => {
//     const { _id } = req.user;
//     const id = uuidv4();
//     const recipeName = `${_id}_${id}_recipe`;
//     return {
//       folder: "recipes_photos",
//       allowed_formats: recipeImgParams.acceptableFileTypes,
//       public_id: recipeName,
//       transformation: [
//         {
//           height: recipeImgParams.dimensions.height,
//           width: recipeImgParams.dimensions.width,
//           crop: "fill",
//         },
//       ],
//     };
//   },
// });

// const uploadImgRecipe = multer({
//   storage: multerImgRecipe,
// }).single("img");

// module.exports = uploadImgRecipe;
// const addRecipe = async (req, res) => {
//   await createRecipe(req);
//   res.json({
//     status: "created",
//     code: 201,
//   });
// };
// const { Recipe } = require("../../models/recipeSchema");

// const createRecipe = async (req) => {
//   const { _id: owner } = req.user;
//   const fileUrl = req.file?.path;
//   await Recipe.create({
//     ...req.body,
//     owner,
//     imageUrl: fileUrl,
//   });
// };

// module.exports = createRecipe;
