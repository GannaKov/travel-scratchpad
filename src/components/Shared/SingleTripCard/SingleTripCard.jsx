/* eslint-disable react/prop-types */

import dayjs from "dayjs";
import StarsShow from "../Stars/StarsShow";
import truncateUrl from "../../../services/truncateUrl";
import styles from "./SingleTripCard.module.css";

const SingleTripCard = ({ singleTrip }) => {
  return (
    <div className={styles.tripWrp}>
      <h1 className={styles.tripItemTitle}>{singleTrip.title}</h1>
      <div className={styles.tripChunk}>
        <StarsShow rating={singleTrip.travel_rating} isReadOnly={true} />
      </div>

      <div className={styles.tripInfoWrp}>
        <p className={styles.tripItemDate}>
          {dayjs(singleTrip.date_start).format("DD.MM.YYYY")}
          &nbsp;&nbsp;-&nbsp;&nbsp;
          {dayjs(singleTrip.date_end).format("DD.MM.YYYY")}
        </p>
        <div className={styles.tripChunk}>
          <span className={styles.tripBoldText}>Purpose:&nbsp;</span>
          {singleTrip.purpose.map((item) => (
            <span key={item}>{item},&nbsp;</span>
          ))}
        </div>
        <div className={styles.tripChunk}>
          <span className={styles.tripBoldText}>Countries:&nbsp;</span>
          {singleTrip.countries.map((country) => (
            <span key={country}>{country}</span>
          ))}
        </div>
        <div className={styles.tripChunk}>
          <span className={styles.tripBoldText}>Destination:&nbsp;</span>
          {singleTrip.destination.length > 0 ? (
            singleTrip.destination.map((city) => <span key={city}>{city}</span>)
          ) : (
            <span>&#x1F937;</span>
          )}
        </div>
        <div className={styles.tripChunk}>
          <p className={styles.tripBoldText}>Seasons:&nbsp;</p>
          {singleTrip.seasons.map((item, ind) => (
            <span key={ind + item}>{item},&nbsp;</span>
          ))}
        </div>
        <div className={styles.tripChunk}>
          <span className={styles.tripBoldText}>Amount:&nbsp;</span>
          {singleTrip.total_amount ? (
            <span>{singleTrip.total_amount}</span>
          ) : (
            <p>💰</p>
          )}
        </div>
        <div className={styles.tripChunk}>
          <p className={styles.tripBoldSubTitleUnderline}>
            Accomodation:&nbsp;
          </p>
          {singleTrip.accommodation.map((accomodation) => (
            <div key={accomodation._id}>
              <div className={styles.tripText}>
                <StarsShow rating={accomodation.rating} isReadOnly={true} />
              </div>
              <div className={styles.tripText}>
                <p className={styles.tripBoldText}>
                  {accomodation.type}:&nbsp;
                </p>
                <a
                  href={accomodation.link}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.tripLink}
                >
                  {truncateUrl(accomodation.link)}
                </a>
              </div>
              <p className={styles.tripBoldText}>Price: {accomodation.price}</p>
              <p className={styles.tripText}>{accomodation.review}</p>
            </div>
          ))}
        </div>
        <div className={styles.tripChunk}>
          <p className={styles.tripBoldSubTitleUnderline}>Expenses:&nbsp;</p>
          <ul>
            {singleTrip.expenses.map((exp) => (
              <li key={exp._id}>
                <p>
                  <span>{exp.item}:&nbsp;</span>
                  <span>{exp.amount}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.tripChunk}>
          <p className={styles.tripBoldSubTitleUnderline}>
            Useful links:&nbsp;
          </p>
          <ul>
            {singleTrip.useful_links.map((item) => (
              <li key={item._id}>
                <span>{item.topic}:&nbsp;</span>
                <a
                  className={styles.tripLink}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {truncateUrl(item.link)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.tripChunk}>
          <p className={styles.tripBoldSubTitle}>Advice:&nbsp;</p>
          <p>{singleTrip.advice}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleTripCard;
