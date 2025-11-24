import zeldaImg from '../assets/zelda.jpg';
import clairObscurImg from '../assets/Expedition33.png';
import blackMythImg from '../assets/Wukong.png';

const productosIniciales = [
  {
    id: 1,
    nombre: "The Legend of Zelda: Breath of the Wild",
    precio: 59.99,
    genero: "Aventura",
    descripcion: "Explora el mundo de Hyrule en esta épica aventura.",
    imagen: zeldaImg
  },
  {
    id: 2,
    nombre: "Clair Obscur: Expedition 33",
    precio: 49.99,
    genero: "RPG",
    descripcion: "Clair Obscur: Expedition 33 es un videojuego de rol de fantasía oscura desarrollado por Sandfall Interactive y publicado por Kepler Interactive. Fue lanzado el 24 de abril de 2025 en las plataformas de Steam, Playstation 5 y Xbox Series X/S.",
    imagen: clairObscurImg
  },
  {
    id: 3,
    nombre: "Black Myth: Wukong",
    precio: 59.99,
    genero: "Acción",
    descripcion: "Black Myth: Wukong es un RPG de acción inspirado en la mitología china. Encarnarás al Predestinado, que ha de embarcarse en un viaje repleto de peligros y maravillas para descubrir la verdad oculta acerca de una gloriosa leyenda del pasado.",
    imagen: blackMythImg
  }
];

export default productosIniciales;
