import {
  useNavigate,
  useLoaderData,
  useLocation,
  Link,
} from "react-router-dom";

import SingleTripCard from "../../../components/Shared/SingleTripCard/SingleTripCard";
import GoBack from "../../../components/GoBack/GoBack";
import styles from "./BlogSinglePage.module.css";

import { deleteOneTrip } from "../../../services/requests";
import useAuth from "../../../context/useAuthHook";
import {
  Carousel,
  CarouselMobile,
} from "../../../components/Shared/Carousel/Carousel";

import { ButtonsTemplate } from "../../../components/Shared/Buttons/Buttons";

const BlogSinglePage = () => {
  const { token } = useAuth();
  const { user } = useAuth();
  const singleTrip = useLoaderData();

  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/blog-main";
  const navigate = useNavigate();

  //-----

  const handleDeleteClick = async () => {
    await deleteOneTrip(singleTrip._id, token);
    navigate("/blog-main");
  };

  //----
  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <GoBack state={backLinkHref} />
        </div>
      </div>

      {singleTrip.images.length === 0 && user.user.id === singleTrip.owner && (
        <div className={styles.sectionBlog}>
          <div className={styles.containerBlog}>
            <div className={styles.sectionBlog}>
              <h3 className={styles.subTitle}>Add your Photos !</h3>
            </div>
          </div>
        </div>
      )}

      {/*-----  Carousel ------*/}
      {singleTrip.images.length > 0 && (
        <div className={styles.containerBlog}>
          <div className={styles.carouselWrp}>
            {singleTrip.images.length > 1 ? (
              <Carousel images={singleTrip.images} />
            ) : (
              <div className={styles.sliderContainer}>
                <img src={singleTrip.images[0]} />
              </div>
            )}
          </div>
          <div className={styles.carouselWrpMobile}>
            {singleTrip.images.length > 1 ? (
              <CarouselMobile images={singleTrip.images} />
            ) : (
              <div className={styles.sliderContainer}>
                <img src={singleTrip.images[0]} />
              </div>
            )}
          </div>
        </div>
      )}

      {/*----- end  Carousel ------*/}

      {/* ---- Card ---------- */}
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          {singleTrip && <SingleTripCard singleTrip={singleTrip} />}
        </div>
      </div>
      {/* ----end Card ---------- */}
      {user.user.id && user.user.id === singleTrip.owner && (
        <div className={styles.btnWrp}>
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
