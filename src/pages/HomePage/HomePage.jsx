/* eslint-disable react/prop-types */
import MainList from "../../components/Shared/MainList/MainList";
import Select from "../../components/Shared/Select/Select";
import styles from "./HomePage.module.css";
import { useNavigate, useLoaderData, useLocation } from "react-router-dom";
import useAuth from "../../context/useAuthHook";
import heroImg from "../../assets/images/hand-writing-notebook-near-tourist-stuff.jpg";

const HomePage = ({
  countriesOptions,
  selectedCountry,
  setSelectedCountry,
}) => {
  const allTripsList = useLoaderData();
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChangeCountry = (event, value) => {
    setSelectedCountry(value);
  };

  const handleAddBtnClick = () => {
    const from = location.pathname;

    if (token) {
      //navigate("/add-form");
      navigate("/add-form", { state: { from } });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionHero}>
        <div className={styles.containerHero}></div>
        {/* <img src={heroImg} alt="Travel image" /> */}
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <h3 className={styles.subTitle}>Add Your Travel</h3>
          {/* <Link
            to={`${trip._id}`}
            state={{ from: location }}
            className={styles.mainItemLink}
          > */}
          <button
            className={styles.addBtn}
            type="button"
            onClick={handleAddBtnClick}
          >
            Add
          </button>
          {/* </Link> */}
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          <Select
            selectedValue={selectedCountry}
            handleChange={handleChangeCountry}
            valueOptions={countriesOptions}
          />
        </div>
      </div>
      <div className={styles.sectionBlog}>
        <div className={styles.containerBlog}>
          {allTripsList && allTripsList.length > 0 ? (
            <MainList tripsArr={allTripsList} />
          ) : (
            <p>No Travels</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
