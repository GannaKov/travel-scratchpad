/* eslint-disable react/prop-types */

import TripItem from "../../TripItem/TripItem";

import styles from "./BlogMainList.module.css";

const BlogMainList = ({ tripsArr }) => {
  //const formattedDate = moment(mongoDate).format('DD.MM.YY');
  return (
    <ul>
      {tripsArr.map((trip) => (
        <li key={trip._id}>
          <TripItem trip={trip} />
        </li>
      ))}
    </ul>
  );
};

export default BlogMainList;
