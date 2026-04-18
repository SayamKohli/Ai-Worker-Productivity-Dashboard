import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const getMetrics = () => axios.get(`${API}/metrics`);
export const seedData = () => axios.post(`${API}/seed`);