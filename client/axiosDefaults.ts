import axios from "axios";
import { getUrl } from "./src/utils/utils";

export function setAxiosDefault() {
  axios.defaults.timeout = 30 * 1000;
  axios.defaults.baseURL = getUrl();
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Accept"] = "application/json";
}

export function setToken(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function getToken() {
  return axios.defaults.headers.common["token"];
}
