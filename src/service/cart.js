import axiosInstance from "./axiosInstance";

/**
 * Obtener el carrito del usuario
 * @param {string} userId
 */
export const getCart = async (userId) => {
  try {
    const res = await axiosInstance.get(`/cart/${userId}`);
    return res.data; // array de productos con cantidad
  } catch (error) {
    console.error("Error getCart:", error);
    return [];
  }
};

/**
 * Agregar un item al carrito
 * @param {string} userId
 * @param {Object} item - producto {id, nombre, precio, cantidad, ...}
 */
export const addToCart = async (userId, item) => {
  try {
    const res = await axiosInstance.post(`/cart/${userId}`, item);
    return res.data;
  } catch (error) {
    console.error("Error addToCart:", error);
    throw error;
  }
};

/**
 * Eliminar un item del carrito
 * @param {string} userId
 * @param {string} itemId
 */
export const removeFromCart = async (userId, itemId) => {
  try {
    const res = await axiosInstance.delete(`/cart/${itemId}`);
    return res.data;
  } catch (error) {
    console.error("Error removeFromCart:", error);
    throw error;
  }
};

/**
 * Actualizar cantidad de un item en el carrito
 * @param {string} userId
 * @param {string} itemId
 * @param {number} cantidad
 */
export const updateCartItem = async (userId, itemId, cantidad) => {
  try {
    const res = await axiosInstance.post(`/cart/${itemId}`, { cantidad });
    return res.data;
  } catch (error) {
    console.error("Error updateCartItem:", error);
    throw error;
  }
};
