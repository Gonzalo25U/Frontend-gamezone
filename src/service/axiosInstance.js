import axios from "axios";

// URL base de tu backend
const BASE_URL = "https://backend-gamezone-zpgm.onrender.com";

// Crear instancia de axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para agregar el token en cada request
axiosInstance.interceptors.request.use(
  (config) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.token) {
      config.headers.Authorization = `Bearer ${usuario.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globales
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Por ejemplo, si el token expira
    if (error.response?.status === 401) {
      localStorage.removeItem("usuario");
      window.location.href = "/login"; // Redirigir a login
      alert("Sesión expirada. Por favor inicia sesión nuevamente.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
