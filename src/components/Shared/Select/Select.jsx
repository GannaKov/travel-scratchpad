/* eslint-disable react/prop-types */
import Autocomplete from "@mui/material/Autocomplete";

import { TextField } from "@mui/material";

const Select = ({ selectedValue, handleChange, valueOptions, label }) => {
  //  const Select = ({ selectedCountry, handleChangeCountry, countriesOptions }) => {
  const labelText = `Choose a ${label}`;
  return (
    <Autocomplete
      id={label}
      autoHighlight
      value={selectedValue}
      onChange={handleChange}
      disableCloseOnSelect
      options={valueOptions}
      getOptionLabel={(option) => option}
      style={{ width: 500 }}
      renderInput={(params) => <TextField {...params} label={labelText} />}
    />
  );
};

export default Select;
