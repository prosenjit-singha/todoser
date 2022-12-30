import axios from "axios";

// const url = "https://todoser-pjaheibam.vercel.app";
const url = "http://localhost:5000";

const api = axios.create({ baseURL: url });

export default api;
