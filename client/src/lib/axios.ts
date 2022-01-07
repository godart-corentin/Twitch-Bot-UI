import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_API_URL;

axiosClient.defaults.timeout = 2000;
axiosClient.defaults.withCredentials = true;

export default axiosClient;
