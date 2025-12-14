import React from "react";

// Componente de pestañas para el panel de administración
export default function AdminTabs({ activeTab, setActiveTab }) {
  return (
    <div className="admin-tabs">
      <button className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>📊 Dashboard</button>
      <button className={`tab-btn ${activeTab === "productos" ? "active" : ""}`} onClick={() => setActiveTab("productos")}>🎮 Productos</button>
      <button className={`tab-btn ${activeTab === "usuarios" ? "active" : ""}`} onClick={() => setActiveTab("usuarios")}>👥 Usuarios</button>
      <button className={`tab-btn ${activeTab === "mensajes" ? "active" : ""}`} onClick={() => setActiveTab("mensajes")}>📧 Mensajes</button>
    </div>
  );
}
