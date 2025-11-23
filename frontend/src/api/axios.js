import axios from "axios";

const api = axios.create({
    baseURL : 'https://backend-u4x0.onrender.com'
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;