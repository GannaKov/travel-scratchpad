/* eslint-disable react/prop-types */

import { Link, useLocation } from "react-router-dom";
import TripShortItem from "../../TripShortItem/TripShortItem";

import styles from "./MainList.module.css";

const MainList = ({ tripsArr }) => {
  //const formattedDate = moment(mongoDate).format('DD.MM.YY');
  const location = useLocation();
  return (
    <ul>
      {tripsArr.map((trip) => (
        <div key={trip._id}>
          <li>
            <TripShortItem trip={trip} />
          </li>
          <Link to={`${trip._id}`} state={{ from: location }}>
            <button type="button">See more</button>
          </Link>
        </div>
      ))}
    </ul>
  );
};

export default MainList;
