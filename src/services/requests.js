import axios from "axios";

const BASEURL = "http://localhost:3000";
//const BASEURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({ baseURL: BASEURL });

export const getAllTripsLoader = async () => {
  const { data } = await instance.get("/trips");
  console.log("data", data.data);
  return data.data;
};
