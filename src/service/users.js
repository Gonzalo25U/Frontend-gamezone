// users.js - Servicio para operaciones de usuarios
import { apiGet, apiPost, apiPut, apiDelete } from "./api";

// Obtener todos los usuarios
export async function getUsers() {
  try {
    return await apiGet("/users");
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw error;
  }
}

// Obtener usuario por ID
export async function getUserById(id) {
  try {
    return await apiGet(`/users/${id}`);
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    throw error;
  }
}

// Crear nuevo usuario (solo admin)
export async function createUser(userData) {
  try {
    return await apiPost("/auth/register", {
      nombre: userData.nombre,
      email: userData.email,
      password: userData.password,
      rol: userData.rol || "usuario"
    });
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw error;
  }
}

// Actualizar usuario
export async function updateUser(id, userData) {
  try {
    const updateData = {
      nombre: userData.nombre,
      email: userData.email,
      rol: userData.rol
    };

    // Incluir contraseña solo si se proporciona
    if (userData.password && userData.password.trim()) {
      updateData.password = userData.password;
    }

    return await apiPut(`/users/${id}`, updateData);
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
}

// Eliminar usuario
export async function deleteUser(id) {
  try {
    return await apiDelete(`/users/${id}`);
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    throw error;
  }
}

// Cambiar rol de usuario
export async function changeUserRole(id, newRole) {
  try {
    return await apiPut(`/users/${id}/role`, { rol: newRole });
  } catch (error) {
    console.error("Error cambiando rol:", error);
    throw error;
  }
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeUserRole
};
