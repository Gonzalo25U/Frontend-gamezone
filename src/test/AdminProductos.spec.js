import React from "react";
import { render, screen } from "@testing-library/react";
import AdminProductos from "../components/AdminProductos";

// Para evitar que el useEffect busque localStorage vacío
beforeEach(() => {
  localStorage.setItem(
    "productos",
    JSON.stringify([{ id: 1, nombre: "Producto de prueba", precio: 10, genero:"Accion", descripcion:"Test", imagen:"Test" }])
  );
});

afterEach(() => {
  localStorage.clear();
});

describe("AdminProductos", () => {
  it("debe mostrar un producto en la lista", () => {
    render(<AdminProductos />);

    const elemento = screen.getByDisplayValue(/Producto de prueba/i);
    expect(elemento).toBeTruthy();
  });
});
