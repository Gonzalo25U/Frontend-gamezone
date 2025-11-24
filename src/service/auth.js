import axiosInstance from "./axiosInstance";

/**
 * Login de usuario
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} usuario con token
 */
export const login = async (email, password) => {
  try {
    const res = await axiosInstance.post("/auth/login", { email, password });
    // Respuesta esperada del backend:
    // {
    //   role: "ROLE_ADMIN",
    //   userId: "uuid",
    //   email: "admin@admin.com",
    //   token: "eyJhbGc..."
    // }
    return res.data;
  } catch (error) {
    console.error("Error login:", error);
    throw new Error(error.response?.data?.message || "Error al iniciar sesión");
  }
};

/**
 * Registro de usuario
 * @param {string} nombre
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} usuario registrado
 */
export const register = async (nombre, email, password) => {
  try {
    const res = await axiosInstance.post("/auth/register", { nombre, email, password });
    return res.data;
  } catch (error) {
    console.error("Error register:", error);
    throw new Error(error.response?.data?.message || "Error al registrarse");
  }
};

/**
 * Logout de usuario
 * Limpia localStorage y opcionalmente redirige
 */
export const logout = () => {
  localStorage.removeItem("usuario");
  window.location.href = "/login";
};
