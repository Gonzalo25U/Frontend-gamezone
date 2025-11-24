import React, { useState } from "react";
import { apiPost, apiDelete } from "../service/api"; // helpers con token
import Swal from "sweetalert2";
import "../styles/carrito.css";

const Carrito = ({ carrito, setCarrito, abierto, cerrar, usuarioActivo, abrirLogin }) => {

  // --- Backend helpers ---
  const agregarBackend = async (itemId, cantidad) => {
    try {
      await apiPost(`/cart/${itemId}`, { cantidad }, usuarioActivo.token);
    } catch (err) {
      console.error("Error al agregar al backend:", err);
    }
  };

  const eliminarBackend = async (itemId) => {
    try {
      await apiDelete(`/cart/${itemId}`, usuarioActivo.token);
    } catch (err) {
      console.error("Error al eliminar del backend:", err);
    }
  };

  // --- Acciones de carrito ---
  const eliminarItem = async (id) => {
    const filtrado = carrito.filter(p => p.id !== id);
    setCarrito(filtrado);
    if (usuarioActivo) await eliminarBackend(id);
  };

  const cambiarCantidad = async (id, cantidad) => {
    if (cantidad < 1) return;

    const actualizado = carrito.map(p => 
      p.id === id ? { ...p, cantidad } : p
    );
    setCarrito(actualizado);

    if (usuarioActivo) await agregarBackend(id, cantidad);
  };

  const vaciarCarrito = async () => {
    if (carrito.length === 0) return;

    if (usuarioActivo) {
      for (const item of carrito) {
        await eliminarBackend(item.id);
      }
    }

    setCarrito([]);
  };

  const comprar = async () => {
    if (!usuarioActivo) {
      if (typeof abrirLogin === "function") abrirLogin();
      else Swal.fire("Inicia sesión", "Debes iniciar sesión para comprar.", "info");
      return;
    }

    if (carrito.length === 0) {
      Swal.fire("Carrito vacío", "Tu carrito está vacío.", "warning");
      return;
    }

    // Verificar stock y ajustar carrito
    const faltantes = carrito.filter(item => item.stock < item.cantidad);
    if (faltantes.length > 0) {
      Swal.fire(
        "Stock insuficiente",
        `No hay suficiente stock de: ${faltantes.map(i => i.nombre).join(", ")}`,
        "error"
      );
      // eliminar los productos que ya no tienen stock
      const nuevos = carrito.filter(item => item.stock > 0);
      setCarrito(nuevos);
      return;
    }

    // Confirmación de compra
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0).toFixed(2);

    const result = await Swal.fire({
      title: "Confirmar compra",
      text: `¿Deseas confirmar tu compra por $${total}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, comprar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      // Limpiar carrito en backend
      if (usuarioActivo) {
        for (const item of carrito) {
          await eliminarBackend(item.id);
        }
      }
      setCarrito([]);
      Swal.fire("Compra exitosa", "Gracias por tu compra.", "success");
      if (typeof cerrar === "function") cerrar();
    }
  };

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0).toFixed(2);

  return (
    <div className={`sidebar-carrito ${abierto ? "abierto" : ""}`}>
      <button className="cerrar" onClick={cerrar}>X</button>
      <h4>Tu Carrito</h4>

      <button
        className="vaciar-carrito"
        onClick={() => Swal.fire({
          title: "Confirmar acción",
          text: "¿Estás seguro de que quieres vaciar el carrito?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, vaciar",
          cancelButtonText: "Cancelar",
        }).then((res) => res.isConfirmed && vaciarCarrito())}
        disabled={carrito.length === 0}
      >
        Vaciar carrito
      </button>

      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        carrito.map(item => (
          <div key={item.id} className="item-carrito">
            <p>{item.nombre}</p>
            <div className="cantidad-control">
              <button onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}>-</button>
              <span>{item.cantidad}</span>
              <button onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}>+</button>
            </div>
            <p>${(item.precio * item.cantidad).toFixed(2)}</p>
            <button className="btn btn-danger btn-sm" onClick={() => eliminarItem(item.id)}>Eliminar</button>
          </div>
        ))
      )}

      <h5>Total: ${total}</h5>

      <button
        className="comprar-btn"
        onClick={comprar}
        disabled={!usuarioActivo || carrito.length === 0}
      >
        {usuarioActivo ? "Comprar ahora" : "Iniciar sesión para comprar"}
      </button>
    </div>
  );
};

export default Carrito;
