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

  // ----------------------------------------------------
  // Cargar productos al iniciar
  // ----------------------------------------------------
  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await apiGet("/products");
      setProducts(data);
    } catch (error) {
      console.error("❌ Error cargando productos:", error);

      Swal.fire({
        icon: "error",
        title: "Error al cargar",
        text: "No se pudieron obtener los productos."
      });
    }
  }

  // ----------------------------------------------------
  // Manejo del formulario
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // Crear producto
  // ----------------------------------------------------
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

      await Swal.fire({
        icon: "success",
        title: "Producto creado",
        text: "El producto se agregó correctamente."
      });

      resetForm();
      loadProducts();
    } catch (error) {
      console.error("❌ ERROR AL CREAR PRODUCTO:", error);

      Swal.fire({
        icon: "error",
        title: "Error al crear producto",
        text:
          error.response?.data?.message ||
          "No se pudo crear el producto. Revisa los datos."
      });
    }
  }

  // ----------------------------------------------------
  // Preparar edición
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // Guardar edición
  // ----------------------------------------------------
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

      await Swal.fire({
        icon: "success",
        title: "Producto actualizado",
        text: "Los cambios se guardaron correctamente."
      });

      resetForm();
      loadProducts();
    } catch (error) {
      console.error("❌ Error al editar:", error);

      Swal.fire({
        icon: "error",
        title: "Error al editar producto",
        text:
          error.response?.data?.message ||
          "No se pudo actualizar el producto."
      });
    }
  }

  // ----------------------------------------------------
  // Eliminar producto
  // ----------------------------------------------------
  async function deleteProduct(id) {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer.",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6"
    });

    if (!confirm.isConfirmed) return;

    try {
      await apiDelete(`/products/${id}`);

      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        text: "El producto se borró correctamente."
      });

      loadProducts();
    } catch (error) {
      console.error("❌ Error al eliminar:", error);
      Swal.fire({
        icon: "error",
        title: "No se pudo eliminar",
        text: "Ocurrió un error al intentar borrar este producto."
      });
    }
  }

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
          <button type="button" onClick={resetForm} className="btn-cancelar">
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
    </div>
  );
}
