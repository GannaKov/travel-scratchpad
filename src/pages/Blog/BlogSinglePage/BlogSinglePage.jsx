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
      <div className={styles.topWrapper}>
        <div className={styles.sectionBlog}>
          <div className={styles.containerBlog}>
            <GoBack state={backLinkHref} />
          </div>
        </div>
        <div>
          {singleTrip.images.length === 0 &&
            user.user.id === singleTrip.owner && (
              <div className={styles.sectionBlog}>
                <p>Add your Photos !</p>
              </div>
            )}
        </div>
        {/*-----  Carousel ------*/}
        {singleTrip.images.length > 0 && (
          <div className={styles.carouselWrp}>
            {singleTrip.images.length > 1 ? (
              <Carousel images={singleTrip.images} />
            ) : (
              <img src={singleTrip.images[0]} style={{ width: 400 }} />
            )}
          </div>
        )}
      </div>

      {/*----- end  Carousel ------*/}
      <div className={styles.sectionsInfoWrp}>
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
              state={`/blog-main/${singleTrip._id}`}
            >
              <button type="button">Edit</button>
            </Link>
            <button type="button" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSinglePage;
