import axios from "axios";

const axiosTest = axios.create({
  baseURL: "http://192.168.1.164:8800",
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});
export default axiosTest;
