/* eslint-disable react/prop-types */
import Autocomplete from "@mui/material/Autocomplete";

import { TextField } from "@mui/material";

const Select = ({ selectedCountry, handleChangeCountry, countriesOptions }) => {
  return (
    <Autocomplete
      id="country"
      autoHighlight
      value={selectedCountry}
      onChange={handleChangeCountry}
      disableCloseOnSelect
      options={countriesOptions}
      getOptionLabel={(option) => option}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Choose a country" />
      )}
    />
  );
};

export default Select;
