import axios from "axios";

const BASEURL = "http://localhost:3000/api";

//const BASEURL = import.meta.env.VITE_BASE_URL;
// const token = {
//   set(token) {
//     instanceBacEnd.defaults.headers.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     instanceBacEnd.defaults.headers.Authorization = "";
//   },
// };
const instance = axios.create({ baseURL: BASEURL });

// get all trips
export const getAllTripsLoader = async (query) => {
  try {
    let urlBackend = "/trips";
    if (query && query.country) {
      urlBackend += `?country=${query.country}`;
    }

    const { data } = await instance.get(urlBackend);
    // console.log("data", data.data);
    return data.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    throw error;
  }
};

// get all trip of Owner
export const getAllOwnerTripsLoader = async (accessToken, query) => {
  try {
    let urlBackend = "/own_trips";
    if (query && query.country) {
      urlBackend += `?country=${query.country}`;
    }
    const { data } = await instance.get(urlBackend, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      //return [];
      throw new Response("Not Found", { status: 404 });
    }
    if (error.response && error.response.status === 403) {
      throw new Response("Forbidden", { status: 403 });
    }
    throw error;
  }
};

// get trip by Id
export const getTripByIdLoader = async ({ params }) => {
  const { data } = await instance.get(`/trips/${params.travel_id}`);
  // console.log("data in get by Id", data.data);
  return data.data;
};
export const getTripById = async (tripId) => {
  const { data } = await instance.get(`/trips/${tripId}`);
  // console.log("data in by Id", data.data);
  return data.data;
};

// get trip's Purpose
export const getTripsPurposes = async () => {
  const { data } = await instance.get(`/trip-purpose`);
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
export const postFormData = async (dataForm, accessToken) => {
  try {
    const { data } = await instance.post("/own_trips", dataForm, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("res", data);
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       }
    return data;
  } catch (err) {
    console.log(err);
  }
};

// put form
export const putFormData = async (tripId, dataForm, accessToken) => {
  try {
    const { data } = await instance.put(`/own_trips/${tripId}`, dataForm, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("res in put", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

// delete form
// export const deleteOneTrip = async (tripId) => {
//   try {
//     const { data } = await instance.delete(`/trips/${tripId}`);
//     console.log("res in put", data);
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
//};
export const deleteOneTrip = async (tripId, accessToken) => {
  try {
    const { data } = await instance.delete(`/own_trips/${tripId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("res in put", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
//===========================

//signup
export const signupUser = async (values) => {
  try {
    const { data } = await instance.post(`/auth/register`, values);
    console.log("res Register User", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//login
export const loginUser = async (values) => {
  try {
    const { data } = await instance.post("/auth/login", values);
    // console.log("res login User", data);
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
    const { data } = await instance.delete(
      "/auth/refresh_token",
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
  const { data } = await instance.get(`/users/${id}`);
  //console.log("data in by Id", data.data);
  return data.data;
};
// Function to refresh tokens
export const refreshToken = async () => {
  const { data } = await instance.get(`/auth/refresh_token`, {
    withCredentials: true,
  });

  return data;
};

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
