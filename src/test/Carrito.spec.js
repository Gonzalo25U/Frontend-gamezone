import React from "react";
import { render, screen } from "@testing-library/react";
import Carrito from "../components/Carrito";

describe("Carrito", () => {
  it("debe mostrar un producto en el carrito", () => {
    const carritoMock = [
      { id: 1, nombre: "Producto de prueba", precio: 10, cantidad: 1 }
    ];

    // En Jasmine, usamos createSpy en lugar de jest.fn()
    const setCarritoMock = jasmine.createSpy("setCarrito");
    const cerrarMock = jasmine.createSpy("cerrar");
    const abrirLoginMock = jasmine.createSpy("abrirLogin");

    render(
      <Carrito
        carrito={carritoMock}
        setCarrito={setCarritoMock}
        abierto={true}
        cerrar={cerrarMock}
        usuarioActivo={true}
        abrirLogin={abrirLoginMock}
      />
    );

    // Buscar el <p> que contiene el nombre del producto
    const elemento = screen.getByText("Producto de prueba");
    expect(elemento).toBeTruthy();
  });
});
