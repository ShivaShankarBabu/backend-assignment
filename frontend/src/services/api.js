import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-api-udnm.onrender.com/api/v1"
});

export const setToken = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default API;
