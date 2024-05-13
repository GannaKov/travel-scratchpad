/* eslint-disable react/prop-types */


import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

import { useState} from "react";
const StarsShow = ({ rating, isReadOnly, handleRatingChange }) => {
  const [value] = useState(rating);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      
      {isReadOnly ? (
        <Rating precision={0.5} value={value} readOnly />
      ) : (
        <Rating
          name="no-value"
          value={null}
          precision={0.5}
          onChange={(event, newValue) => {
           
          
            handleRatingChange(newValue);
          }}
        />
      )}

    </Box>
  );
};

export default StarsShow;
