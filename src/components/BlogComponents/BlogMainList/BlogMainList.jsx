/* eslint-disable react/prop-types */
import moment from "moment";
import Stars from "../../Stars/Stars";

import styles from "./BlogMainList.module.css";

const BlogMainList = ({ tripsArr }) => {
  //const formattedDate = moment(mongoDate).format('DD.MM.YY');
  return (
    <ul>
      {tripsArr.map((trip) => (
        <li key={trip._id}>
          <h2>{trip.title}</h2>
          <p>{trip.travel_rating}</p>
          <Stars rating={trip.travel_rating} />
          {/* <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="start"
                style={{
                  cursor: "pointer",
                  color: trip.travel_rating >= star ? "gold" : "gray",
                  fontSize: `35px`,
                }}
              >
                ★
              </span>
            ))}
          </div> */}
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
