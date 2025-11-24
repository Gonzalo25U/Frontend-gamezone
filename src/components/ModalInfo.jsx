import React from "react";
import "../styles/modal.css";

const ModalInfo = ({ titulo, mensaje, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content neon-modal info-modal">
        <h3>{titulo}</h3>
        <p>{mensaje}</p>
        <div className="modal-buttons">
          <button className="neon-btn" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInfo;