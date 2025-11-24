import React from "react";
import { render, screen } from "@testing-library/react";
import Catalogo from "../components/Catalogo";

describe("Catalogo", () => {
  it("debe mostrar los 3 productos iniciales", () => {
    try {
      render(<Catalogo />);

      // Verificamos que los 3 productos estén presentes
      const productos = [
        "The Legend of Zelda: Breath of the Wild",
        "Clair Obscur: Expedition 33",
        "Black Myth: Wukong",
      ];

      // Recorremos y comprobamos que estén en pantalla
      productos.forEach((nombre) => {
        const elemento = screen.getByText(nombre);
        expect(elemento).toBeTruthy();
      });
    } catch (error) {
      console.error(error);
      throw error; // importante para que Jasmine marque el test como fallido
    }
  });
});
