import React from "react";
import { act } from "react-dom/test-utils";
import { createRoot } from "react-dom/client";
import Catalogo from "../components/Catalogo";

const productosMock = [
  { id: 1, nombre: "Juego 1", precio: 10000, descripcion: "Desc 1", imageUrl: "img1.jpg" },
  { id: 2, nombre: "Juego 2", precio: 12000, descripcion: "Desc 2", imageUrl: "img2.jpg" },
  { id: 3, nombre: "Juego 3", precio: 14000, descripcion: "Desc 3", imageUrl: "img3.jpg" },
  { id: 4, nombre: "Juego 4", precio: 16000, descripcion: "Desc 4", imageUrl: "img4.jpg" },
];

describe("Catalogo component", () => {
  let container;
  let root;
  let agregarAlCarritoSpy;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    agregarAlCarritoSpy = jasmine.createSpy("agregarAlCarrito");
  });

  afterEach(() => {
    root.unmount();
    container.remove();
  });

  it("muestra el título del catálogo", async () => {
    const apiGetMock = jasmine.createSpy().and.resolveTo(productosMock);

    await act(async () => {
      root.render(
        <Catalogo
          agregarAlCarrito={agregarAlCarritoSpy}
          apiGetFn={apiGetMock}
        />
      );
    });

    expect(container.textContent).toContain("Nuestros Juegos");
  });

  it("renderiza solo 3 productos", async () => {
    const apiGetMock = jasmine.createSpy().and.resolveTo(productosMock);

    await act(async () => {
      root.render(
        <Catalogo
          agregarAlCarrito={agregarAlCarritoSpy}
          apiGetFn={apiGetMock}
        />
      );
    });

    expect(container.querySelectorAll(".producto-card").length).toBe(3);
  });

  it('muestra botón "Ver más juegos"', async () => {
    const apiGetMock = jasmine.createSpy().and.resolveTo(productosMock);

    await act(async () => {
      root.render(
        <Catalogo
          agregarAlCarrito={agregarAlCarritoSpy}
          apiGetFn={apiGetMock}
        />
      );
    });

    expect(container.textContent).toContain("Ver más juegos");
  });

  it("abre el modal al hacer click", async () => {
    const apiGetMock = jasmine.createSpy().and.resolveTo(productosMock);

    await act(async () => {
      root.render(
        <Catalogo
          agregarAlCarrito={agregarAlCarritoSpy}
          apiGetFn={apiGetMock}
        />
      );
    });

    const btn = [...container.querySelectorAll("button")]
      .find(b => b.textContent === "Ver más juegos");

    await act(async () => btn.click());

    expect(container.textContent).toContain("Catálogo Completo");
  });

  it("llama a agregarAlCarrito", async () => {
    const apiGetMock = jasmine.createSpy().and.resolveTo(productosMock);

    await act(async () => {
      root.render(
        <Catalogo
          agregarAlCarrito={agregarAlCarritoSpy}
          apiGetFn={apiGetMock}
        />
      );
    });

    await act(async () => {
      container.querySelector(".btn-agregar").click();
    });

    expect(agregarAlCarritoSpy).toHaveBeenCalled();
  });

  it("muestra error si falla la carga", async () => {
    const apiGetMock = jasmine.createSpy().and.rejectWith(new Error("Error"));

    await act(async () => {
      root.render(
        <Catalogo
          agregarAlCarrito={agregarAlCarritoSpy}
          apiGetFn={apiGetMock}
        />
      );
    });

    expect(container.textContent).toContain("Error al cargar productos.");
  });
});
