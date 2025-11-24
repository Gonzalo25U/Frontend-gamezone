import React, { useState, useEffect } from "react";
import { apiGet } from "../service/api";   // helper GET con backend
import "../styles/catalogo.css";

const Catalogo = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos desde backend
  const cargarProductos = async () => {
    try {
      setCargando(true);
      const data = await apiGet("/products");
      setProductos(data);
      setError(null);
    } catch (err) {
      console.error("Error cargando productos:", err);
      setError("Error al cargar productos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <section id="catalogo" className="catalogo-section">
      <div className="catalogo-header">
        <h2>Nuestros Juegos</h2>
        <p>Descubre nuestra selección de títulos</p>
      </div>

      {cargando && <p className="loading-msg">Cargando productos...</p>}
      {error && <p className="error-msg">{error}</p>}

      {!cargando && !error && (
        <div className="productos-grid">
          {productos.slice(0, 3).map(producto => (
            <div key={producto.id} className="producto-card">
              <img src={producto.imageUrl} alt={producto.nombre} />
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <p className="precio">${producto.precio}</p>
                <p className="descripcion">{producto.descripcion}</p>
                <button
                  className="btn-agregar"
                  onClick={() => agregarAlCarrito(producto)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!cargando && productos.length > 3 && (
        <button
          className="btn-ver-mas neon-button"
          onClick={() => setModalAbierto(true)}
        >
          Ver más juegos
        </button>
      )}

      {modalAbierto && (
        <div
          className="catalogo-modal-overlay"
          onClick={() => setModalAbierto(false)}
        >
          <div className="catalogo-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-cerrar" onClick={() => setModalAbierto(false)}>✕</button>
            <h2>Catálogo Completo</h2>
            <div className="modal-grid">
              {productos.map(producto => (
                <div key={producto.id} className="producto-card modal-card">
                  <img src={producto.imageUrl} alt={producto.nombre} />
                  <div className="producto-info">
                    <h3>{producto.nombre}</h3>
                    <p className="precio">${producto.precio}</p>
                    <p className="descripcion">{producto.descripcion}</p>
                    <button
                      className="btn-agregar"
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Catalogo;
