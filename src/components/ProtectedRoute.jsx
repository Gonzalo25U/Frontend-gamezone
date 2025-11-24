import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute protege rutas según rol y sesión
 * @param {ReactNode} children - Componente a renderizar
 * @param {string} role - Rol requerido ("admin" opcional)
 */
const ProtectedRoute = ({ children, role }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Si no hay usuario logueado, redirige a login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifica rol y no coincide, redirige al home
  if (role && usuario.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
