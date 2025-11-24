import React, { useState } from "react";
import { login } from "../service/auth";
import Swal from "sweetalert2";
import "../styles/login.css";

const Login = ({ setUsuarioActivo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(email, password);

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

      // 🎉 Alerta según rol
      if (usuario.role === "admin") {
        await Swal.fire({
          icon: "success",
          title: "Bienvenido Admin",
          text: `Hola ${usuario.email}, tienes privilegios de administración.`,
          background: "#1e1e1e",
          color: "#fff",
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        await Swal.fire({
          icon: "info",
          title: "Bienvenido",
          text: `Hola ${usuario.email}, has iniciado sesión como usuario normal.`,
          background: "#1e1e1e",
          color: "#fff",
          timer: 2000,
          showConfirmButton: false
        });
      }

      // Redirigir
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: err.message || "Credenciales incorrectas o servidor no disponible.",
        background: "#1e1e1e",
        color: "#fff"
      });
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className="login-form">
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
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="register-link">
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;
