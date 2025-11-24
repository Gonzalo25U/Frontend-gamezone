// services/products.js
import { apiGet, apiPost, apiDelete, apiPut } from "../api";

// Obtener productos del backend
export async function obtenerProductos() {
  return apiGet("/products");
}

// Crear producto (solo admin)
export async function crearProducto(producto) {
  return apiPost("/products", producto);
}

// Editar producto (solo admin)
export async function actualizarProducto(id, producto) {
  return apiPut(`/products/${id}`, producto);
}

// Eliminar producto
export async function eliminarProducto(id) {
  return apiDelete(`/products/${id}`);
}
