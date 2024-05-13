/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./GoBack.module.css";
import { ButtonsTemplate } from "../Shared/Buttons/Buttons";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

const GoBack = ({ state }) => {
  return (
    <Link className={styles.goBackLink} to={state}>
      <ButtonsTemplate size="large" variant="outlined" color="darkGreen">
        <KeyboardArrowLeft />
        Go Back
      </ButtonsTemplate>
    </Link>
  );
};

export default GoBack;
