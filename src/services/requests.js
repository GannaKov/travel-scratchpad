import axios from "axios";

const BASEURL = "http://localhost:3000";
//const BASEURL = import.meta.env.VITE_BASE_URL;

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
  console.log("data in get by Id", data.data);
  return data.data;
};
export const getTripById = async (tripId) => {
  const { data } = await instance.get(`/trips/${tripId}`);
  console.log("data in by Id", data.data);
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
    console.log("dataForm", dataForm);
    const { data } = await instance.post("/add-trip", dataForm, {
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

// put form
export const putFormData = async (tripId, dataForm) => {
  try {
    console.log("data in ax", dataForm);
    const { data } = await instance.put(`/add-trip/${tripId}`, dataForm, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    // console.log("res in put", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// delete form
export const deleteOneTrip = async (tripId) => {
  try {
    const { data } = await instance.delete(`/trips/${tripId}`);
    console.log("res in put", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
//===========================

//signup
export const signupUser = async (values) => {
  try {
    const { data } = await instance.post(`/api/users/register`, values);
    console.log("res Register User", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//login
export const loginUser = async (values) => {
  try {
    const { data } = await instance.post("/api/users/login", values);
    return data;
  } catch (error) {
    console.log(error);
  }
};
//------
export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};
//-----
// logout
export const logoutUser = async () => {
  try {
    const { data } = await instance.post(
      "/api/users/logout",
      {},
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
