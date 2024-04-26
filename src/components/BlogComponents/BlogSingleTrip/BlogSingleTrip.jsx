/* eslint-disable react/prop-types */
import moment from "moment";
import dayjs from "dayjs";
import StarsShow from "../../Stars/StarsShow";
import truncateUrl from "../../../services/truncateUrl";
import styles from "./BlogSingleTrip.module.css";

import { Link, useNavigate } from "react-router-dom";
import { deleteOneTrip } from "../../../services/requests";

const BlogSingleTrip = ({ singleTrip }) => {
  const navigate = useNavigate();

  // const handleDeleteClick = () => {};
  return (
    <div>
      <div>
        <h1>{singleTrip.title}</h1>
        <StarsShow rating={singleTrip.travel_rating} isReadOnly={true} />
        <p>
          {dayjs(singleTrip.date_start).format("DD.MM.YYYY")}
          &nbsp;&nbsp;-&nbsp;&nbsp;
          {dayjs(singleTrip.date_end).format("DD.MM.YYYY")}
        </p>
        <img src={singleTrip.main_img} className={styles.tripItemImg} />
        <div>
          <span className={styles.subTitle}>Countries:</span>
          {singleTrip.countries.map((country) => (
            <span key={country}>{country}</span>
          ))}
        </div>
        <div>
          <span className={styles.subTitle}>Destination:</span>
          {singleTrip.destination.map((city) => (
            <span key={city}>{city}</span>
          ))}
        </div>
        <p className={styles.subTitle}>Purpose: </p>
        {singleTrip.purpose.map((item) => (
          <span key={item}>{item},&nbsp;</span>
        ))}
        <p className={styles.subTitle}>Seasons: </p>
        {singleTrip.seasons.map((item, ind) => (
          <span key={ind + item}>{item},&nbsp;</span>
        ))}
        <p className={styles.subTitle}>Amount:</p>
        <p>{singleTrip.total_amount}</p>
        <p className={styles.subTitle}>Accomodation:</p>
        {singleTrip.accommodation.map((accomodation) => (
          <div key={accomodation._id}>
            <StarsShow rating={accomodation.rating} isReadOnly={true} />
            <span>{accomodation.type}:&nbsp;</span>
            <a href={accomodation.link} target="_blank" rel="noreferrer">
              {truncateUrl(accomodation.link)}
            </a>
            <p>Price: {accomodation.price}</p>
            <p>{accomodation.review}</p>
          </div>
        ))}
        <p className={styles.subTitle}>Expenses</p>
        <ul>
          {" "}
          {singleTrip.expenses.map((exp) => (
            <li key={exp._id}>
              {" "}
              <p>
                <span>{exp.item}:&nbsp;</span>
                <span>{exp.amount}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className={styles.subTitle}>Useful links</p>
        <ul>
          {singleTrip.useful_links.map((item) => (
            <li key={item._id}>
              <span>{item.topic}:&nbsp;</span>
              <a href={item.link} target="_blank" rel="noreferrer">
                {truncateUrl(item.link)}
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.subTitle}>Advice:</p>
        <p>{singleTrip.advice}</p>
      </div>
      {/* <Link
        to={`/add-form?mode=true&id=${singleTrip._id}`}
        state={`/blog-main/${singleTrip._id}`}
      >
        <button type="button">Edit</button>
      </Link>
      <button type="button" onClick={handleDeleteClick}>
        Delete
      </button> */}
    </div>
  );
};

export default BlogSingleTrip;
