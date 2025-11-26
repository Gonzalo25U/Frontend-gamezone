import React, { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../service/api";
import Swal from "sweetalert2";
import "../styles/adminPanel.css";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    genero: "",
    descripcion: "",
    imageUrl: "",
    stock: ""
  });

  const [mensajes, setMensajes] = useState([]);

  // Cargar productos y mensajes al iniciar
  useEffect(() => {
    loadProducts();

    const mensajesGuardados = JSON.parse(localStorage.getItem("mensajes")) || [];
    setMensajes(mensajesGuardados);
  }, []);

  async function loadProducts() {
    try {
      const data = await apiGet("/products");
      setProducts(data);
    } catch (error) {
      console.error("❌ Error cargando productos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los productos",
        background: "#1e1e1e",
        color: "#fff"
      });
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      precio: "",
      genero: "",
      descripcion: "",
      imageUrl: "",
      stock: ""
    });
    setEditing(null);
  };

  // Crear producto
  async function createProduct(e) {
    e.preventDefault();

    try {
      const response = await apiPost("/products", {
        nombre: form.nombre,
        precio: parseFloat(form.precio),
        genero: form.genero,
        descripcion: form.descripcion,
        imageUrl: form.imageUrl,
        stock: parseInt(form.stock)
      });

      resetForm();
      loadProducts();

      Swal.fire({
        icon: "success",
        title: "Producto creado",
        text: `El producto "${response.nombre}" se creó correctamente`,
        background: "#1e1e1e",
        color: "#fff"
      });
    } catch (error) {
      console.error("❌ ERROR AL CREAR PRODUCTO:", error);

      let msg = "Error desconocido al crear producto";
      if (error.response) {
        msg = `Error backend: ${JSON.stringify(error.response.data)}`;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: msg,
        background: "#1e1e1e",
        color: "#fff"
      });
    }
  }

  function prepareEdit(product) {
    setEditing(product.id);
    setForm({
      nombre: product.nombre,
      precio: product.precio,
      genero: product.genero,
      descripcion: product.descripcion,
      imageUrl: product.imageUrl,
      stock: product.stock
    });
  }

  async function saveEdit(e) {
    e.preventDefault();

    try {
      await apiPut(`/products/${editing}`, {
        nombre: form.nombre,
        precio: parseFloat(form.precio),
        genero: form.genero,
        descripcion: form.descripcion,
        imageUrl: form.imageUrl,
        stock: parseInt(form.stock)
      });

      resetForm();
      loadProducts();

      Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        text: `El producto "${form.nombre}" se actualizó correctamente`,
        background: "#1e1e1e",
        color: "#fff"
      });
    } catch (error) {
      console.error("❌ Error al editar:", error);

      let msg = "Error desconocido al editar producto";
      if (error.response) {
        msg = `Error backend: ${JSON.stringify(error.response.data)}`;
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: msg,
        background: "#1e1e1e",
        color: "#fff"
      });
    }
  }

  async function deleteProduct(id) {
    const confirmResult = await Swal.fire({
      title: "¿Eliminar este producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#1e1e1e",
      color: "#fff"
    });

    if (!confirmResult.isConfirmed) return;

    try {
      await apiDelete(`/products/${id}`);
      loadProducts();

      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        text: "El producto fue eliminado correctamente",
        background: "#1e1e1e",
        color: "#fff"
      });
    } catch (error) {
      console.error("❌ Error al eliminar:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el producto",
        background: "#1e1e1e",
        color: "#fff"
      });
    }
  }

  // 🔥 ELIMINAR MENSAJE 🔥
  const deleteMessage = (index) => {
    const nuevos = mensajes.filter((_, i) => i !== index);
    setMensajes(nuevos);
    localStorage.setItem("mensajes", JSON.stringify(nuevos));

    Swal.fire({
      icon: "success",
      title: "Mensaje eliminado",
      background: "#1e1e1e",
      color: "#fff"
    });
  };

  return (
    <div className="admin-container">
      <h1>Administración de Productos</h1>

      {/* FORMULARIO */}
      <form className="admin-form" onSubmit={editing ? saveEdit : createProduct}>
        <h2>{editing ? "Editar Producto" : "Agregar Producto"}</h2>

        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <input
          name="precio"
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />

        <input
          name="genero"
          placeholder="Género"
          value={form.genero}
          onChange={handleChange}
          required
        />

        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        />

        <input
          name="imageUrl"
          placeholder="URL de imagen"
          value={form.imageUrl}
          onChange={handleChange}
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editing ? "Guardar Cambios" : "Crear Producto"}
        </button>

        {editing && (
          <button type="button" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      {/* TABLA */}
      <h2>Productos Registrados</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Género</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <img src={p.imageUrl} width="80" height="80" alt="prod" />
              </td>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>{p.genero}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => prepareEdit(p)}>Editar</button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="btn-delete"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔥 NUEVA SECCIÓN: MENSAJES DE CONTACTO 🔥 */}
      <h2>Mensajes de Contacto</h2>

      {mensajes.length === 0 ? (
        <p>No hay mensajes todavía.</p>
      ) : (
        <div className="mensajes-lista">
          {mensajes.map((m, i) => (
            <div key={i} className="mensaje-card">
              <h4>{m.nombre}</h4>
              <p><strong>Email:</strong> {m.email}</p>
              <p>{m.mensaje}</p>
              <small>{m.fecha}</small>

              <button
                className="btn-delete"
                onClick={() => deleteMessage(i)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
