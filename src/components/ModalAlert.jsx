import React from "react";
import "../styles/modal.css";

const ModalAlert = ({ titulo, mensaje, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content neon-modal">
        <h3>{titulo}</h3>
        <p>{mensaje}</p>
        <div className="modal-buttons">
          <button className="btn-confirm neon-btn" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};


export default ModalAlert;
