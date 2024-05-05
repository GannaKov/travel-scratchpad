/* eslint-disable react/prop-types */
import Autocomplete from "@mui/material/Autocomplete";

import { TextField } from "@mui/material";

const Select = ({ selectedValue, handleChange, valueOptions }) => {
  //  const Select = ({ selectedCountry, handleChangeCountry, countriesOptions }) => {
  return (
    <Autocomplete
      id="country"
      autoHighlight
      value={selectedValue}
      onChange={handleChange}
      disableCloseOnSelect
      options={valueOptions}
      getOptionLabel={(option) => option}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Choose a country" />
      )}
    />
  );
};

export default Select;