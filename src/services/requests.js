import axios from "axios";

const BASEURL = "http://localhost:3000";
//const BASEURL = import.meta.env.VITE_BASE_URL;
console.log(BASEURL);
const instance = axios.create({ baseURL: BASEURL });

// get all trips
export const getAllTripsLoader = async () => {
  const { data } = await instance.get("/trips");
  // console.log("data", data.data);
  return data.data;
};
// get trip by Id
export const getTripByIdLoader = async ({ params }) => {
  const { data } = await instance.get(`/trips/${params.travel_id}`);
  // console.log("data", data.data);
  return data.data;
};

// get trip's Purpose
export const getTripsPurposes = async () => {
  const { data } = await instance.get(`trip-purpose`);
  // console.log("data", data.data);
  return data.data;
};

// get accommodation's type
export const getAccommodationType = async () => {
  const { data } = await instance.get(`/accommodation`);
  //console.log("data", data.data);
  return data.data;
};

// get accommodation's type
export const getCountriesOptions = async () => {
  const result = axios.get(
    `https://restcountries.com/v3/all`
    //`https://restcountries.com/v3/name/${value}?match=${value}&fields=name`
  );

  return result;
};

// post form
export const postFormData = async (dataForm) => {
  try {
    const { data } = await instance.put("/add-trip", dataForm, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    // console.log("res", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
