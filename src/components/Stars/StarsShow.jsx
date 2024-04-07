/* eslint-disable react/prop-types */

const StarsShow = ({ rating }) => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="start"
          style={{
            cursor: "pointer",
            color: rating >= star ? "gold" : "gray",
            fontSize: `35px`,
          }}
        >
          ★
        </span>
      ))}
    </>
  );
};

export default StarsShow;
