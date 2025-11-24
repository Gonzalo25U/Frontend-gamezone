import React, { useState } from "react";
import { register } from "../service/auth";
import Swal from "sweetalert2";
import "../styles/login.css";

const Register = ({ setUsuarioActivo }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await register(nombre, email, password);

      const usuario = {
        id: data.userId,
        email: data.email,
        role: data.role,
        token: data.token
      };

      // 🔥 Guardar token y usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      if (typeof setUsuarioActivo === "function") setUsuarioActivo(usuario);

      // Mensaje de éxito
      await Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: `Bienvenido ${usuario.email}`,
        background: "#1e1e1e",
        color: "#fff",
        timer: 1500,
        showConfirmButton: false
      });

      // Redirigir
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error al registrarse",
        text: err.message || "No se pudo crear la cuenta.",
        background: "#1e1e1e",
        color: "#fff"
      });
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Regístrate</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-login" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <p className="register-link">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>
    </div>
  );
};

export default Register;
