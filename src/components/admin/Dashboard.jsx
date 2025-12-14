import React from "react";

// Componente de dashboard para el panel de administración
export default function Dashboard({ stats }) {
  return (
    <div className="dashboard-section">
      <h2>Estadísticas Generales</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎮</div>
          <div className="stat-info">
            <h3>Productos</h3>
            <p className="stat-number">{stats.totalProductos}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Usuarios</h3>
            <p className="stat-number">{stats.totalUsuarios}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📧</div>
          <div className="stat-info">
            <h3>Mensajes</h3>
            <p className="stat-number">{stats.totalMensajes}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Ingresos</h3>
            <p className="stat-number">${stats.totalIngresos}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
