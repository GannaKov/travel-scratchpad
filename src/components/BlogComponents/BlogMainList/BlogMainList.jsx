/* eslint-disable react/prop-types */
import moment from "moment";

import styles from "./BlogMainList.module.css";

const BlogMainList = ({ tripsArr }) => {
  //const formattedDate = moment(mongoDate).format('DD.MM.YY');
  return (
    <ul>
      {tripsArr.map((trip) => (
        <li key={trip._id}>
          <h2>{trip.title}</h2>
          <p>{trip.travel_rating}</p>

          <p>
            {moment(trip.date_start).format("DD.MM.YYYY")}
            &nbsp;&nbsp;-&nbsp;&nbsp;
            {moment(trip.date_end).format("DD.MM.YYYY")}
          </p>
          <img src={trip.main_img} />
        </li>
      ))}
    </ul>
  );
};

export default BlogMainList;
