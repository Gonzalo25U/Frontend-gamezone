import React from "react";

const Logout = ({ setUsuarioActivo }) => {
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    if (typeof setUsuarioActivo === "function") setUsuarioActivo(null);
    window.location.href = "/login";
  };

  return (
    <button className="btn-logout" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};

export default Logout;
