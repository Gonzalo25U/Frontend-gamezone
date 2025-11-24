// api.js
import axios from "axios";

const BASE_URL = "https://backend-gamezone-zpgm.onrender.com";

// Cliente Axios configurado
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
});

// Interceptor para enviar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ---------- FUNCIONES GENERALES ----------

// GET
export async function apiGet(endpoint) {
  const { data } = await api.get(endpoint);
  return data;
}

// POST
export async function apiPost(endpoint, body) {
  const { data } = await api.post(endpoint, body);
  return data;
}

// PUT (por si lo necesitas)
export async function apiPut(endpoint, body) {
  const { data } = await api.put(endpoint, body);
  return data;
}

// DELETE
export async function apiDelete(endpoint) {
  const { data } = await api.delete(endpoint);
  return data;
}

export default api;
