/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";
import StarsShow from "../Stars/StarsShow";
import styles from "./TripItem.module.css";

const TripItem = ({ trip }) => {
  // console.log("trip", trip);
  return (
    <div>
      <h2>{trip.title}</h2>

      <StarsShow rating={trip.travel_rating} isReadOnly={true} />

      <p>
        {dayjs(trip.date_start).format("DD.MM.YYYY")}
        &nbsp;&nbsp;-&nbsp;&nbsp;
        {dayjs(trip.date_end).format("DD.MM.YYYY")}
      </p>
      <img src={trip.main_img} className={styles.tripItemImg} />
      <p>Purpose: </p>
      {trip.purpose.map((item) => (
        <span key={item}>{item},&nbsp;</span>
      ))}
      <div>
        <span>Countries:</span>
        {trip.countries.map((country) => (
          <span key={country}>{country}</span>
        ))}
      </div>
      <div>
        <span>Destination:</span>
        {trip.destination.map((city) => (
          <span key={city}>{city}</span>
        ))}
      </div>

      <p>Amount: {trip.total_amount}</p>
      <Link to={`${trip._id}`} state="/blog-main/">
        <button type="button">See more</button>
      </Link>
    </div>
  );
};

export default TripItem;
