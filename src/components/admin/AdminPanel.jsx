import React, { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../../service/api";
import Swal from "sweetalert2";
import "../../styles/adminPanel.css";

import AdminHeader from "./AdminHeader";
import AdminTabs from "./AdminTabs";
import Dashboard from "./Dashboard";
import AdminProductos from "./AdminProductos";
import AdminUsuarios from "./AdminUsuarios";
import AdminMensajes from "./AdminMensajes";

// Componente principal del panel de administración
export default function AdminPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const [productForm, setProductForm] = useState({
    nombre: "",
    precio: "",
    genero: "",
    descripcion: "",
    imageUrl: "",
    stock: ""
  });

  const [userForm, setUserForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rol: "usuario"
  });

  const [stats, setStats] = useState({
    totalProductos: 0,
    totalUsuarios: 0,
    totalMensajes: 0,
    totalIngresos: 0
  });

  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (!e) return;
      const keysToWatch = ["carrito", "ventas", "orders", "token", "usuario", "mensajes"];
      if (keysToWatch.includes(e.key)) {
        loadDashboard();
      }
    };

    window.addEventListener("storage", onStorage);

    const intervalId = setInterval(() => {
      loadDashboard();
    }, 15000);

    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const onPurchase = (evt) => {
      loadDashboard();
    };

    window.addEventListener('app:purchase', onPurchase);
    return () => window.removeEventListener('app:purchase', onPurchase);
  }, []);

  async function loadDashboard() {
    try {
      const productosData = await apiGet("/products");
      setProducts(productosData);

      const usuariosData = await apiGet("/admin/users");

      const normalizedUsers = Array.isArray(usuariosData)
        ? usuariosData.map((u) => {
            const roleSource =
              u.rol || u.role || (Array.isArray(u.roles) && (u.roles[0]?.name || u.roles[0])) || "";
            const isAdmin = roleSource.toString().toLowerCase().includes("admin");

            return {
              ...u,
              id: u.id || u._id || u.userId || (u.email ? u.email : undefined),
              nombre: u.nombre || u.name || u.username || u.email || "",
              email: u.email || "",
              rol: isAdmin ? "admin" : "usuario"
            };
          })
        : [];

      setUsers(normalizedUsers);

      const mensajesGuardados = JSON.parse(localStorage.getItem("mensajes")) || [];
      setMensajes(mensajesGuardados);

      const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
      const totalIngresosFromVentas = ventas.reduce((acc, v) => acc + (parseFloat(v.total) || 0), 0);

      const totalIngresos = totalIngresosFromVentas > 0
        ? totalIngresosFromVentas
        : productosData.reduce((acc, p) => acc + (p.precio || 0), 0);

      setStats({
        totalProductos: productosData.length,
        totalUsuarios: normalizedUsers.length,
        totalMensajes: mensajesGuardados.length,
        totalIngresos: totalIngresos.toFixed(2)
      });
    } catch (error) {
      console.error("Error cargando dashboard:", error);
      Swal.fire({
        icon: "error",
        title: "Error cargando datos",
        text: error.response?.data?.message || error.message || "Revisa la consola para más detalles",
        background: "#1e1e1e",
        color: "#fff"
      });
    }
  }

  const handleProductChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const resetProductForm = () => {
    setProductForm({
      nombre: "",
      precio: "",
      genero: "",
      descripcion: "",
      imageUrl: "",
      stock: ""
    });
    setEditingProduct(null);
  };

  async function createProduct(e) {
    e.preventDefault();

    try {
      await apiPost("/products", {
        nombre: productForm.nombre,
        precio: parseFloat(productForm.precio),
        genero: productForm.genero,
        descripcion: productForm.descripcion,
        imageUrl: productForm.imageUrl,
        stock: parseInt(productForm.stock)
      });

      resetProductForm();
      loadDashboard();

      Swal.fire({ icon: "success", title: "Producto creado", background: "#1e1e1e", color: "#fff" });
    } catch (error) {
      console.error("Error al crear producto:", error);
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo crear el producto", background: "#1e1e1e", color: "#fff" });
    }
  }

  function prepareEditProduct(product) {
    setEditingProduct(product.id);
    setProductForm({
      nombre: product.nombre,
      precio: product.precio,
      genero: product.genero,
      descripcion: product.descripcion,
      imageUrl: product.imageUrl,
      stock: product.stock
    });
  }

  async function saveEditProduct(e) {
    e.preventDefault();

    try {
      await apiPut(`/products/${editingProduct}`, {
        nombre: productForm.nombre,
        precio: parseFloat(productForm.precio),
        genero: productForm.genero,
        descripcion: productForm.descripcion,
        imageUrl: productForm.imageUrl,
        stock: parseInt(productForm.stock)
      });

      resetProductForm();
      loadDashboard();

      Swal.fire({ icon: "success", title: "Producto actualizado", background: "#1e1e1e", color: "#fff" });
    } catch (error) {
      console.error("Error al editar:", error);
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo actualizar el producto", background: "#1e1e1e", color: "#fff" });
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
      loadDashboard();

      Swal.fire({ icon: "success", title: "Producto eliminado", background: "#1e1e1e", color: "#fff" });
    } catch (error) {
      console.error("Error al eliminar:", error);
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo eliminar el producto", background: "#1e1e1e", color: "#fff" });
    }
  }

  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const resetUserForm = () => {
    setUserForm({ nombre: "", email: "", password: "", rol: "usuario" });
    setEditingUser(null);
  };

  async function createUser(e) {
    e.preventDefault();

    if (!userForm.nombre || !userForm.email || !userForm.password) {
      Swal.fire({ icon: "warning", title: "Campos incompletos", text: "Completa todos los campos", background: "#1e1e1e", color: "#fff" });
      return;
    }

    try {
      const createPayload = {
        nombre: userForm.nombre,
        name: userForm.nombre,
        email: userForm.email,
        password: userForm.password,
        rol: userForm.rol,
        role: userForm.rol === "admin" ? "ROLE_ADMIN" : "ROLE_USER",
        roles: userForm.rol === "admin" ? ["ROLE_ADMIN"] : ["ROLE_USER"]
      };

      await apiPost("/admin/users", createPayload);

      resetUserForm();
      loadDashboard();

      Swal.fire({ icon: "success", title: "Usuario creado", text: "El usuario se creó correctamente", background: "#1e1e1e", color: "#fff" });
    } catch (error) {
      console.error("Error al crear usuario:", error);
      Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.message || "No se pudo crear el usuario", background: "#1e1e1e", color: "#fff" });
    }
  }

  function prepareEditUser(user) {
    setEditingUser(user.id);
    setUserForm({ nombre: user.nombre, email: user.email, password: "", rol: user.rol });
  }

  async function saveEditUser(e) {
    e.preventDefault();

    try {
      const updatePayload = {
        nombre: userForm.nombre,
        name: userForm.nombre,
        email: userForm.email,
        rol: userForm.rol,
        role: userForm.rol === "admin" ? "ROLE_ADMIN" : "ROLE_USER",
        roles: userForm.rol === "admin" ? ["ROLE_ADMIN"] : ["ROLE_USER"],
        ...(userForm.password && { password: userForm.password })
      };

      await apiPut(`/admin/users/${editingUser}`, updatePayload);

      resetUserForm();
      loadDashboard();

      Swal.fire({ icon: "success", title: "Usuario actualizado", text: "El usuario se actualizó correctamente", background: "#1e1e1e", color: "#fff" });
    } catch (error) {
      console.error("Error al editar usuario:", error);
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo actualizar el usuario", background: "#1e1e1e", color: "#fff" });
    }
  }

  async function deleteUser(id) {
    const confirmResult = await Swal.fire({
      title: "¿Eliminar este usuario?",
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
      await apiDelete(`/admin/users/${id}`);
      loadDashboard();

      Swal.fire({ icon: "success", title: "Usuario eliminado", text: "El usuario fue eliminado correctamente", background: "#1e1e1e", color: "#fff" });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo eliminar el usuario", background: "#1e1e1e", color: "#fff" });
    }
  }

  const deleteMessage = (index) => {
    const nuevos = mensajes.filter((_, i) => i !== index);
    setMensajes(nuevos);
    localStorage.setItem("mensajes", JSON.stringify(nuevos));

    Swal.fire({ icon: "success", title: "Mensaje eliminado", background: "#1e1e1e", color: "#fff" });
  };

  return (
    <div className="admin-fullscreen">
      <AdminHeader onClose={onClose} onRefresh={() => loadDashboard()} />
      <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="admin-content">
        {activeTab === "dashboard" && <Dashboard stats={stats} />}
        {activeTab === "productos" && (
          <AdminProductos
            products={products}
            productForm={productForm}
            editingProduct={editingProduct}
            onProductChange={handleProductChange}
            onProductSubmit={editingProduct ? saveEditProduct : createProduct}
            onPrepareEditProduct={prepareEditProduct}
            onResetProductForm={resetProductForm}
            onDeleteProduct={deleteProduct}
          />
        )}
        {activeTab === "usuarios" && (
          <AdminUsuarios
            users={users}
            userForm={userForm}
            editingUser={editingUser}
            onUserChange={handleUserChange}
            onUserSubmit={editingUser ? saveEditUser : createUser}
            onPrepareEditUser={prepareEditUser}
            onDeleteUser={deleteUser}
            onResetUserForm={resetUserForm}
          />
        )}
        {activeTab === "mensajes" && (
          <AdminMensajes mensajes={mensajes} onDeleteMessage={deleteMessage} />
        )}
      </div>
    </div>
  );
}
