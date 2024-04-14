/* eslint-disable react/prop-types */

// const StarsShow = ({ rating }) => {
//   return (
//     <>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span
//           key={star}
//           className="start"
//           style={{
//             cursor: "pointer",
//             color: rating >= star ? "gold" : "gray",
//             fontSize: `35px`,
//           }}
//         >
//           ★
//         </span>
//       ))}
//     </>
//   );
// };

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

import { useState, useEffect } from "react";
const StarsShow = ({ rating, isReadOnly }) => {
  const [value, setValue] = useState(rating);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      {/* <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      /> */}
      {isReadOnly ? (
        <Rating precision={0.5} value={value} readOnly />
      ) : (
        <Rating name="no-value" value={null} precision={0.5} />
      )}

      {/* <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} /> */}
    </Box>
  );
};

export default StarsShow;
