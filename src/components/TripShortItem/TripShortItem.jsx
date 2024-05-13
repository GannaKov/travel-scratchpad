/* eslint-disable react/prop-types */

import TravelPlaceholder from "../../assets/images/3d-character-emerging-from-smartphone.jpg";
import dayjs from "dayjs";
import StarsShow from "../Shared/Stars/StarsShow";
import styles from "./TripShortItem.module.css";
import { useEffect, useState } from "react";

import { getUserById } from "../../services/requests";

const TripShortItem = ({ trip }) => {
  const [userOwnerTrip, setUserOwnerTrip] = useState({});
  //const { user: currentUser } = useAuth();

  useEffect(() => {
    getUserById(trip.owner)
      .then((res) => setUserOwnerTrip(res))
      .catch((error) => console.log(error));
  }, [trip.owner]);

  return (
    <div className={styles.tripItemWrp}>
      <div className={styles.tripOwnerAvatarWrp}>
        <p className={styles.tripOwnerAvatarText}>{userOwnerTrip.username}</p>
      </div>
      <h2 className={styles.tripItemTitle}>{trip.title}</h2>
      <StarsShow
        rating={trip.travel_rating}
        isReadOnly={true}
        className={styles.tripItemRating}
      />
      <p className={styles.tripItemDate}>
        {dayjs(trip.date_start).format("DD.MM.YYYY")}
        &nbsp;&nbsp;-&nbsp;&nbsp;
        {dayjs(trip.date_end).format("DD.MM.YYYY")}
      </p>
      <div className={styles.tripImageWrp}>
        {trip.main_img ? (
          <img src={trip.main_img} className={styles.tripItemImg} />
        ) : (
          <img src={TravelPlaceholder} className={styles.tripItemImg} />
        )}
      </div>
      <div className={styles.tripChunk}>
        <span className={styles.tripBoldText}>Purpose:&nbsp;</span>
        {trip.purpose.map((item) => (
          <span key={item}>{item},&nbsp;</span>
        ))}
      </div>
      <div className={styles.tripChunk}>
        <span className={styles.tripBoldText}>Countries:&nbsp;</span>
        {trip.countries.map((country) => (
          <span key={country}>{country}</span>
        ))}
      </div>
      <div className={styles.tripChunk}>
        <span className={styles.tripBoldText}>Destination:&nbsp;</span>
        {trip.destination.length > 0 ? (
          trip.destination.map((city) => <span key={city}>{city}</span>)
        ) : (
          <span>&#x1F937;</span>
        )}
      </div>
      <div className={styles.tripChunk}>
        <span className={styles.tripBoldText}>Amount:&nbsp;</span>
        {trip.total_amount ? <span>{trip.total_amount}</span> : <p>💰</p>}
      </div>
    </div>
  );
};

export default TripShortItem;
