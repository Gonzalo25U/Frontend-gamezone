import React from "react";
// Componente para mostrar y gestionar los mensajes de contacto en el panel de administración
export default function AdminMensajes({ mensajes, onDeleteMessage }) {
  return (
    <div className="section-container">
      <h2>Mensajes de Contacto</h2>

      {mensajes.length === 0 ? (
        <p className="empty-state">No hay mensajes todavía.</p>
      ) : (
        <div className="mensajes-lista">
          {mensajes.map((m, i) => (
            <div key={i} className="mensaje-card">
              <h4>{m.nombre}</h4>
              <p><strong>Email:</strong> {m.email}</p>
              <p>{m.mensaje}</p>
              <small>{m.fecha}</small>
              <button className="btn-delete" onClick={() => onDeleteMessage(i)}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
