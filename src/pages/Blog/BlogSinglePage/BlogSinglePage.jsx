import {
  useNavigate,
  useLoaderData,
  useLocation,
  useParams,
  Link,
} from "react-router-dom";

import SingleTripCard from "../../../components/Shared/SingleTripCard/SingleTripCard";
import GoBack from "../../../components/GoBack/GoBack";
import styles from "./BlogSinglePage.module.css";
import { useEffect, useState } from "react";
import { deleteOneTrip, getTripById } from "../../../services/requests";
import useAuth from "../../../context/useAuthHook";
import Carousel from "../../../components/Shared/Carousel/Carousel";
import TravelPlaceholder from "../../../assets/images/3d-character-emerging-from-smartphone.jpg";
import { ButtonsTemplate } from "../../../components/Shared/Buttons/Buttons";

const BlogSinglePage = () => {
  const { token, setToken } = useAuth();
  const { user, setUser } = useAuth();
  const singleTrip = useLoaderData();
  console.log("singleTrip", singleTrip.owner, "user", user);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/blog-main";
  const navigate = useNavigate();

  //-----
  // const { travel_id } = useParams();

  const handleDeleteClick = async () => {
    await deleteOneTrip(singleTrip._id, token);
    navigate("/blog-main");
  };

  //----
  return (
    <div className={styles.pageWrpapper}>
      {/* <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <p>single Map</p>
        </div>
      </div> */}

      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <GoBack state={backLinkHref} />
        </div>
      </div>
      <div>
        {singleTrip.images.length === 0 &&
          user.user.id === singleTrip.owner && (
            <div className={styles.sectionBlog}>
              <h3 className={styles.subTitle}>Add your Photos !</h3>
            </div>
          )}
      </div>
      {/*-----  Carousel ------*/}
      {singleTrip.images.length > 0 && (
        <div className={styles.carouselWrp}>
          {singleTrip.images.length > 1 ? (
            <Carousel images={singleTrip.images} />
          ) : (
            <img src={singleTrip.images[0]} />
          )}
        </div>
      )}

      {/*----- end  Carousel ------*/}

      {/* ---- Card ---------- */}
      <div className={styles.sectionBlog}>
        {" "}
        <div className={styles.containerBlog}>
          {" "}
          {singleTrip && <SingleTripCard singleTrip={singleTrip} />}
        </div>
      </div>
      {/* ----end Card ---------- */}
      {user.user.id && user.user.id === singleTrip.owner && (
        <div className={styles.btnWrp}>
          {" "}
          <Link
            to={`/add-form?mode=true&id=${singleTrip._id}`}
            state={{ from: location.pathname }}
          >
            <ButtonsTemplate
              size="medium"
              variant="contained"
              color="darkGreen"
              style={{ width: "80px" }}
            >
              Edit
            </ButtonsTemplate>
          </Link>
          <ButtonsTemplate
            size="medium"
            variant="contained"
            color="pink"
            onClick={handleDeleteClick}
            style={{ width: "80px" }}
          >
            Delete
          </ButtonsTemplate>
        </div>
      )}
    </div>
  );
};

export default BlogSinglePage;
