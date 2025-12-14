import React from "react";
// Componente de encabezado para el panel de administración
export default function AdminHeader({ onClose, onRefresh }) {
  return (
    <div className="admin-header">
      <h1>Panel de Administración</h1>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button className="btn-refresh-admin" onClick={onRefresh} title="Refrescar">⟳</button>
        <button className="btn-close-admin" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
