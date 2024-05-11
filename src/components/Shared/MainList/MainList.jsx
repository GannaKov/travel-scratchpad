/* eslint-disable react/prop-types */

import { Link, useLocation } from "react-router-dom";
import TripShortItem from "../../TripShortItem/TripShortItem";

import styles from "./MainList.module.css";
import { ButtonsTemplate } from "../Buttons/Buttons";

const MainList = ({ tripsArr }) => {
  //const formattedDate = moment(mongoDate).format('DD.MM.YY');
  const location = useLocation();
  return (
    <ul className={styles.mainList}>
      {tripsArr.map((trip) => (
        <div key={trip._id} className={styles.mainItemWrp}>
          <li className={styles.mainItem}>
            <TripShortItem trip={trip} />
            <Link
              to={`${trip._id}`}
              state={{ from: location }}
              className={styles.mainItemLink}
            >
              <ButtonsTemplate
                color="darkGreen"
                size="medium"
                variant="contained"
              >
                See more
              </ButtonsTemplate>
            </Link>
          </li>
        </div>
      ))}
    </ul>
  );
};

export default MainList;
