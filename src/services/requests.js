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
    const { data } = await instance.post(`/api/auth/register`, values);
    console.log("res Register User", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//login
export const loginUser = async (values) => {
  try {
    const { data } = await instance.post("/api/auth/login", values);
    console.log("res login User", data);
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
      "/api/auth/logout",
      {},
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
//=======
export const getUserById = async (id) => {
  const { data } = await instance.get(`/api/users/${id}`);
  console.log("data in by Id", data.data);
  return data.data;
};
// Function to refresh tokens
export const refreshToken = async () => {
  try {
    const response = await instance.get(`/api/auth/refresh_token`, {
      credentials: "include", // Include cookies in the request
    });
  } catch {}
};
// async function refreshToken() {
//   try {
//     const response = await fetch("/refresh_token", {
//       method: "GET",
//       credentials: "include", // Include cookies in the request
//     });
//     if (!response.ok) {
//       throw new Error("Failed to refresh token");
//     }
//     const tokens = await response.json();
//     // Update stored tokens with the new ones
//     // For example, update localStorage or cookies
//     localStorage.setItem("accessToken", tokens.accessToken);
//     localStorage.setItem("refreshToken", tokens.refreshToken);
//     return tokens.accessToken;
//   } catch (error) {
//     console.error("Error refreshing token:", error);
//     // Handle error, e.g., redirect to login page
//   }
// }

// // Example of using the access token to make a request
// async function fetchData() {
//   const accessToken = localStorage.getItem("accessToken");
//   try {
//     const response = await fetch("/protected_endpoint", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     if (response.status === 401) {
//       // Access token expired, attempt to refresh it
//       const newAccessToken = await refreshToken();
//       // Retry request with the new access token
//       return fetchData();
//     }
//     // Process response data
//     const data = await response.json();
//     console.log("Data:", data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// // Example usage
// fetchData();
