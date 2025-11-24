import React, { useState } from "react";
import noticiasIniciales from "../data/noticiasIniciales";
import "../styles/noticias.css";

const Noticias = () => {
  const [noticiaActiva, setNoticiaActiva] = useState(null);

  return (
    <section id="noticias" className="noticias-section">
      <div className="noticias-header">
        <h2>Noticias de Videojuegos</h2>
        <p>Mantente al día con las últimas novedades y lanzamientos del mundo gaming.</p>
      </div>
      <div className="noticias-container">
        {noticiasIniciales.map(noticia => (
          <div key={noticia.id} className="card noticia-card">
            <img 
              src={noticia.imagen} 
              alt={noticia.titulo} 
              onClick={() => setNoticiaActiva(noticia)}
            />
            <div className="card-body">
              <h5>{noticia.titulo}</h5>
              <p>{noticia.descripcion}</p>
            </div>
          </div>
        ))}
      </div>

      {noticiaActiva && (
        <div className="noticia-overlay" onClick={() => setNoticiaActiva(null)}>
          <div className="noticia-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{noticiaActiva.titulo}</h3>
            <p>{noticiaActiva.fecha}</p>
            <img src={noticiaActiva.imagen} alt={noticiaActiva.titulo} />
            <p>{noticiaActiva.descripcion}</p>

            {/* Botón fuente */}
            <a 
              href={noticiaActiva.fuente} // Cambié 'link' por 'fuente'
              target="_blank" 
              rel="noreferrer" 
              className="btn-fuente"
            >
              Fuente
            </a>

            <button onClick={() => setNoticiaActiva(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Noticias;
