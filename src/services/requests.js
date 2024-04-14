import axios from "axios";

//const BASEURL = "http://localhost:3000";
const BASEURL = import.meta.env.VITE_BASE_URL;
console.log(BASEURL);
const instance = axios.create({ baseURL: BASEURL });

export const getAllTripsLoader = async () => {
  const { data } = await instance.get("/trips");

  return data.data;
};

export const getTripByIdLoader = async ({ params }) => {
  const { data } = await instance.get(`/trips/${params.travel_id}`);
  console.log("data", data.data);
  return data.data;
};
