import React, { useState, useEffect } from "react";
import ModalAlert from "./ModalAlert";
import "../styles/mensajesPanel.css";

const MensajesPanel = () => {
  const [mensajes, setMensajes] = useState([]);
  const [modalEliminarMensaje, setModalEliminarMensaje] = useState(null);

  useEffect(() => {
    const mensajesGuardados = JSON.parse(localStorage.getItem("mensajes")) || [];
    setMensajes(mensajesGuardados);
  }, []);

  const eliminarMensaje = (index) => {
    const nuevosMensajes = mensajes.filter((_, i) => i !== index);
    setMensajes(nuevosMensajes);
    localStorage.setItem("mensajes", JSON.stringify(nuevosMensajes));
    setModalEliminarMensaje(null);
  };

  return (
    <div className="mensajes-panel">
      <h3>
        <i className="fas fa-envelope"></i> 
        Mensajes de Contacto
        {mensajes.length > 0 && (
          <span className="mensajes-badge">{mensajes.length}</span>
        )}
      </h3>

      <div className="lista-mensajes">
        {mensajes.length === 0 ? (
          <div className="no-mensajes">
            <i className="fas fa-inbox"></i>
            <p>No hay mensajes nuevos</p>
          </div>
        ) : (
          mensajes.map((mensaje, index) => (
            <div key={index} className="mensaje-card">
              <div className="mensaje-header">
                <h5>
                  <i className="fas fa-user"></i> {mensaje.nombre}
                </h5>
                <span className="mensaje-fecha">
                  <i className="fas fa-clock"></i> {mensaje.fecha}
                </span>
              </div>
              <p className="mensaje-email">
                <i className="fas fa-at"></i> {mensaje.email}
              </p>
              <p className="mensaje-contenido">{mensaje.mensaje}</p>
              <button 
                className="btn-eliminar"
                onClick={() => setModalEliminarMensaje({ index, nombre: mensaje.nombre })}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))
        )}
      </div>

      {modalEliminarMensaje && (
        <ModalAlert
          titulo="Eliminar Mensaje"
          mensaje={`¿Estás seguro de eliminar el mensaje de ${modalEliminarMensaje.nombre}?`}
          onConfirm={() => eliminarMensaje(modalEliminarMensaje.index)}
          onCancel={() => setModalEliminarMensaje(null)}
        />
      )}
    </div>
  );
};

export default MensajesPanel;