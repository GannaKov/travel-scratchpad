/* eslint-disable react/prop-types */
import MainList from "../../components/Shared/MainList/MainList";
import Select from "../../components/Shared/Select/Select";
import styles from "./HomePage.module.css";
import { useNavigate, useLoaderData, useLocation } from "react-router-dom";
import useAuth from "../../context/useAuthHook";

import { ButtonsTemplate } from "../../components/Shared/Buttons/Buttons";

const HomePage = ({
  countriesOptions,
  selectedCountry,
  setSelectedCountry,
  purposeOptions,
  setSelectedPurpose,
  selectedPurpose,
  setOpenLogIn,
}) => {
  const allTripsList = useLoaderData();
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChangeCountry = (event, value) => {
    setSelectedCountry(value);
  };
  const handleChangePurpose = (event, value) => {
    setSelectedPurpose(value);
  };

  const handleAddBtnClick = () => {
    const from = location.pathname;

    if (token) {
      navigate("/add-form", { state: { from } });
    } else {
      setOpenLogIn(true);
    }
  };

  return (
    <div className={styles.pageWrpapper}>
      <div className={styles.sectionHero}>
        <div className={styles.containerHero}></div>
      </div>
      <div className={styles.sectionsWrapper}>
        <div className={styles.sectionBlog}>
          <div className={styles.containerBlog}>
            <h3 className={styles.subTitle}>Add Your Trip</h3>

            <ButtonsTemplate
              color="darkGreen"
              size="large"
              variant="contained"
              onClick={handleAddBtnClick}
            >
              Add
            </ButtonsTemplate>
          </div>
        </div>
        <div className={styles.sectionLine}></div>
        <div className={styles.sectionBlog}>
          <div className={styles.containerBlog}>
            <div className={styles.selectWrp}>
              <Select
                selectedValue={selectedCountry}
                handleChange={handleChangeCountry}
                valueOptions={countriesOptions}
                label="country"
              />
              <Select
                selectedValue={selectedPurpose}
                handleChange={handleChangePurpose}
                valueOptions={purposeOptions}
                label="purpose"
              />
            </div>
          </div>
        </div>
        <div className={styles.sectionBlog}>
          <div className={styles.containerBlog}>
            {allTripsList && allTripsList.length > 0 ? (
              <MainList tripsArr={allTripsList} />
            ) : (
              <>
                <p className={styles.subText}>There are no such trips yet.</p>
                <p className={styles.subText}>
                  Be first and share your experience ! 🌸
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
