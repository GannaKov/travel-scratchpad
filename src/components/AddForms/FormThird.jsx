import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { createFilterOptions } from "@mui/material/Autocomplete";

import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
//import { debounce } from "lodash";
//--------------
import axios from "axios";
import Box from "@mui/material/Box";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Checkbox from "@mui/material/Checkbox";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
//-----------------

const FormThird = () => {
  //const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  //------------fetch all countries var 1

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://restcountries.com/v3/all`
        //`https://restcountries.com/v3/name/${value}?match=${value}&fields=name`
      )
      .then((res) => {
        const countryNames = res.data.map((country) => country.name.common);

        setOptions(countryNames);
      })
      .catch((error) => console.log(error.status, error.message))
      .finally(() => setLoading(false));
  }, []);
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    // limit: 10,
    trim: true,
  });
  //--------------------------------

  // const fetchCountries = async (searchText) => {
  //   try {
  //     setLoading(true);

  //     console.log("input", inputValue);
  //     const response = await fetch(
  //       `https://restcountries.com/v3.1/name/${searchText}?fields=name`
  //     );
  //     const data = await response.json();
  //     console.log("data", data);
  //     const countryNames = data.map((country) => country.name.common);
  //     setOptions(countryNames);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching countries:", error);
  //     setLoading(false);
  //   }
  // };

  // const debouncedFetch = debounce(fetchCountries, 300);

  // const handleInputChange = (event, newInputValue) => {
  //   if (newInputValue.trim() === "") {
  //     console.log("empty");
  //     return;
  //   }
  //   setInputValue(newInputValue);
  //   debouncedFetch(newInputValue);
  // };
  return (
    <>
      <Autocomplete
        filterOptions={filterOptions}
        multiple
        autoHighlight
        disableCloseOnSelect
        // value={inputValue}
        // onChange={(event, newValue) => setInputValue(newValue)}
        // inputValue={inputValue}
        // onInputChange={handleInputChange}
        options={options}
        getOptionLabel={(option) => option}
        //loading={loading}
        renderOption={(props, option, { selected }) => (
          <Box component="li" {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </Box>
        )}
        style={{ width: 500 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a country"
            placeholder="Countries"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        // renderInput={(params) => (
        //   <TextField
        //     {...params}
        //     label="Country"
        //     variant="outlined"
        //     InputProps={{
        //       ...params.InputProps,
        //       endAdornment: (
        //         <>
        //           {loading ? (
        //             <CircularProgress color="inherit" size={20} />
        //           ) : null}
        //           {params.InputProps.endAdornment}
        //         </>
        //       ),
        //     }}
        //   />
        // )}
      />
    </>
  );
};

export default FormThird;
