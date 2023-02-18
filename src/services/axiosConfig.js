import Axios from "axios";
import { STORAGE_KEY_ACCESS_TOKEN } from "../constants/localstorage";
import { getLocalStorage } from "./storage/storage";

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const privateAxios = Axios.create(
  { baseURL: process.env.REACT_APP_API_BASE_URL }
);

export const setTokenInHeader = (config) => {
  const accessToken = getLocalStorage(STORAGE_KEY_ACCESS_TOKEN);
  config.headers["Authorization"] = `Bearer ${accessToken}`;
};

export const redirectIfUnauthorized = (err) => {
  console.log(err);
};
