import React, { useState } from "react";
import "../styles/nosotros.css";

const Nosotros = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validarEmail = (email) => {
    // Expresión regular simple para validar email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    if (!formData.nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }
    if (!validarEmail(formData.email)) {
      setError("Ingresa un email válido.");
      return;
    }
    if (!formData.mensaje.trim() || formData.mensaje.length < 10) {
      setError("El mensaje debe tener al menos 10 caracteres.");
      return;
    }

    setError(""); // limpiar errores

    // Leer mensajes existentes de localStorage
    const mensajes = JSON.parse(localStorage.getItem("mensajes")) || [];

    // Agregar el nuevo mensaje
    mensajes.push({ ...formData, fecha: new Date().toLocaleString() });

    // Guardar en localStorage
    localStorage.setItem("mensajes", JSON.stringify(mensajes));

    alert(`Gracias, ${formData.nombre}! Hemos recibido tu mensaje.`);
    
    // Limpiar formulario
    setFormData({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <>
      <section id="nosotros" className="nosotros-section">
        <div className="nosotros-header">
          <h2>Sobre Nosotros</h2>
          <p>GameZone es tu tienda de videojuegos favorita, ofreciendo los últimos lanzamientos y novedades del mundo gaming.</p>
        </div>
        <div className="nosotros-content">
          <p>
            En GameZone nos apasionan los videojuegos y queremos que cada jugador encuentre lo que busca. Nuestro equipo está comprometido con ofrecer productos de calidad y un servicio excepcional.
          </p>
          <p>
            Además, mantenemos a nuestra comunidad informada con noticias actualizadas y recomendaciones de los mejores juegos del momento.
          </p>
        </div>
      </section>

      <section id="contacto" className="contacto-section">
        <div className="contacto-header">
          <h2>Contáctanos</h2>
          <p>Envía tus consultas o sugerencias y te responderemos lo antes posible.</p>
        </div>

        {error && <p className="error-form">{error}</p>}

        <form className="contacto-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="mensaje"
            placeholder="Mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </>
  );
};

export default Nosotros;
