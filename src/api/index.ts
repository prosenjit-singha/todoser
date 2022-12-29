import axios from "axios";

// https://todoser.vercel.app
const url = "http://localhost:5000";

const api = axios.create({ baseURL: url });

export default api;
