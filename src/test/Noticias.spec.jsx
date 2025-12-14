import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Noticias from "../components/Noticias";
import noticiasIniciales from "../data/noticiasIniciales";

describe("Noticias component", () => {

  it("muestra el título y subtítulo", () => {
    render(<Noticias />);

    expect(
      screen.getByText("Noticias de Videojuegos")
    ).toBeTruthy();

    expect(
      screen.getByText(/Mantente al día con las últimas novedades/i)
    ).toBeTruthy();
  });

  it("renderiza las noticias iniciales", () => {
    render(<Noticias />);

    noticiasIniciales.forEach(noticia => {
      expect(
        screen.getByText(noticia.titulo)
      ).toBeTruthy();

      expect(
        screen.getByText(noticia.descripcion)
      ).toBeTruthy();
    });
  });

    it("abre el modal al hacer click en una noticia", () => {
    render(<Noticias />);

    const primeraNoticia = noticiasIniciales[0];

    fireEvent.click(
        screen.getByAltText(primeraNoticia.titulo)
    );

    const tituloModal = screen.getByRole("heading", { level: 3 });

    expect(tituloModal.textContent)
        .toContain(primeraNoticia.titulo);

    expect(
        screen.getByText(primeraNoticia.fecha)
    ).toBeTruthy();
    });


  it("cierra el modal al hacer click en el botón Cerrar", () => {
    render(<Noticias />);

    const primeraNoticia = noticiasIniciales[0];

    fireEvent.click(
      screen.getByAltText(primeraNoticia.titulo)
    );

    const botonCerrar = screen.getByText("Cerrar");
    fireEvent.click(botonCerrar);

    expect(
      screen.queryByText(primeraNoticia.fecha)
    ).toBeNull();
  });

  it("el botón Fuente apunta a la URL correcta", () => {
    render(<Noticias />);

    const primeraNoticia = noticiasIniciales[0];

    fireEvent.click(
      screen.getByAltText(primeraNoticia.titulo)
    );

    const linkFuente = screen.getByText("Fuente");

    expect(linkFuente.getAttribute("href"))
      .toBe(primeraNoticia.fuente);
  });

});
