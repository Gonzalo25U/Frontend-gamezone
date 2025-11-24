import React from "react";
import "../styles/footer.css";
import logo from "../assets/logo.png"; // Asegúrate de tener el logo en esta ruta

const Footer = () => (
  <footer className="footer">
    <div className="footer-left">
      <img src={logo} alt="GameZone Logo" className="footer-logo" />
      <p>GameZone © {new Date().getFullYear()} Todos los derechos reservados</p>
    </div>
    <div className="footer-right">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
      </a>
    </div>
  </footer>
);

export default Footer;
