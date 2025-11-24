import React from "react";
import "../styles/navbar.css";
import logo from "../assets/logo.png"; // Asegúrate de tener el logo en esta ruta

const Navbar = ({
  carrito,
  setUsuarioActivo,
  usuarioActivo,
  setMostrarLogin,
  abrirCarrito,
  setAdminAbierto // 🔹 simplemente lo recibimos como prop
}) => {
  const handleLogout = () => {
    setUsuarioActivo(null);
    localStorage.removeItem("usuarioActivo");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="GameZone Logo" />
        <span>GameZone</span>
      </div>

      <ul className="navbar-links">
        <li><a href="#catalogo">Catálogo</a></li>
        <li><a href="#noticias">Noticias</a></li>
        <li><a href="#nosotros">Nosotros</a></li>

        {usuarioActivo && usuarioActivo.rol === "admin" && (
          <li>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              setAdminAbierto(true);
            }}>
              Panel Admin
            </a>
          </li>
        )}
      </ul>

      <div className="navbar-actions">
        <button className="carrito-btn" onClick={abrirCarrito}>
          🛒 ({carrito.length})
        </button>

        {!usuarioActivo ? (
          <button className="login-btn" onClick={() => setMostrarLogin(true)}>
            Iniciar sesión
          </button>
        ) : (
          <>
            <span className="usuario-nombre">{usuarioActivo.nombre}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;