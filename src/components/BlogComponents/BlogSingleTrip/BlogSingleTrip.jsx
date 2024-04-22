/* eslint-disable react/prop-types */
import moment from "moment";
import StarsShow from "../../Stars/StarsShow";
import truncateUrl from "../../../services/truncateUrl";
import styles from "./BlogSingleTrip.module.css";

const BlogSingleTrip = ({ singleTrip }) => {
  return (
    <div>
      <h1>{singleTrip.title}</h1>
      <p>
        {moment(singleTrip.date_start).format("DD.MM.YYYY")}
        &nbsp;&nbsp;-&nbsp;&nbsp;
        {moment(singleTrip.date_end).format("DD.MM.YYYY")}
      </p>
      <div>
        <span>Countries:</span>
        {singleTrip.countries.map((country) => (
          <span key={country}>{country}</span>
        ))}
      </div>
      <div>
        <span>Destination:</span>
        {singleTrip.destination.map((city) => (
          <span key={city}>{city}</span>
        ))}
      </div>
      <p>{singleTrip.total_amount}</p>
      <p>Accomodation:</p>

      {singleTrip.accommodation.map((accomodation) => (
        <div key={accomodation._id}>
          <StarsShow rating={accomodation.rating} isReadOnly={true} />
          <span>{accomodation.type}:</span>
          <a href={accomodation.link}>{truncateUrl(accomodation.link)}</a>
          <p>Price: {accomodation.price}</p>
          <p>{accomodation.review}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogSingleTrip;
