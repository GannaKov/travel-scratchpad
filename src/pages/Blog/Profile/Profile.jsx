import styles from "./Profile.module.css";
import useAuth from "../../../context/useAuthHook";
import { useState } from "react";
import axios from "axios";

import { Button } from "@mui/material";
import { changeUser } from "../../../services/requests";
const Profile = () => {
  const { user, setUser } = useAuth();

  const { token } = useAuth();
  const [uploadFile, setUploadFile] = useState("");

  const [cloudinaryImage, setCloudinaryImage] = useState(user.user.avatar);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    const CLOUD_Name = import.meta.env.VITE_CLOUD_NAME;
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("upload_preset", "avatars-react");

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${CLOUD_Name}/image/upload`,
        formData
      )
      .then((response) => {
        setCloudinaryImage(response.data.secure_url);
        setIsUploaded(true);

        changeUser(
          user.user.id,
          { new_avatar: response.data.secure_url },
          token
        );
        setUser((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            avatar: response.data.secure_url,
          },
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <h1 className={styles.profileTitle}>Your Profile</h1>
          {/* ------- */}
          <div className={styles.avatarSectionWrp}>
            {cloudinaryImage && (
              <div className={styles.profileAvatarImgWrp}>
                <img
                  className={styles.profileAvatarImg}
                  src={cloudinaryImage}
                />
              </div>
            )}

            <form className={styles.avatarForm}>
              <p className={styles.profileAccentText}> Select your Avatar</p>
              <div className={styles.avatarInputWrp}>
                <Button type="button" variant="contained">
                  <label htmlFor="avatar_file" style={{ cursor: "pointer" }}>
                    Select
                  </label>
                </Button>

                <input
                  style={{ display: "none" }}
                  type="file"
                  id="avatar_file"
                  onChange={(event) => {
                    setUploadFile(event.target.files[0]);
                  }}
                />
                {!isUploaded && uploadFile && <p>{uploadFile.name}</p>}
              </div>
              {uploadFile && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleUpload}
                  sx={{ width: "60px" }}
                >
                  Submit
                </Button>
              )}
            </form>

            {/* <h3 className={styles.profileTitle}>Your Avatar</h3> */}
          </div>

          {/* ------- */}
          <p className={styles.profileText}>
            <span className={styles.profileAccentText}>Username</span>
            :&nbsp;{user.user.username}
          </p>
          <p className={styles.profileText}>
            <span className={styles.profileAccentText}>Email</span>
            :&nbsp;{user.user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
