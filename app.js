import { Carton } from "./carton.js";
import { shuffle } from "./desornedar.js";
import { CANTIDAD_NUMEROS_CARTON, saltos, valores } from "./utils.js";

let count = 0;
let valorBingo = 0;

const numJugador = shuffle(saltos).at(Math.floor(Math.random() * 6));
const numOrdenador = shuffle(saltos).at(Math.floor(Math.random() * 6));

const cartonJugador = shuffle(valores).slice(
  numJugador,
  numJugador + CANTIDAD_NUMEROS_CARTON,
);

const cartonOrdenador = shuffle(valores).slice(
  numOrdenador,
  numOrdenador + CANTIDAD_NUMEROS_CARTON,
);

const main = document.querySelector("main");
const contenedorNumerosEscogidos = main.querySelector(".numeros-escogidos");
const { firstElementChild: sacarNumero } = document.querySelector(".bingo");

const jugador = new Carton("player", cartonJugador);
const ordenador = new Carton("cpu", cartonOrdenador);

(() => {
  main.insertAdjacentElement("afterbegin", jugador.carton);
  contenedorNumerosEscogidos.insertAdjacentElement(
    "beforebegin",
    ordenador.carton,
  );

  window.addEventListener("keypress", ({ code }) => {
    if (code === "Space") bingo();
  });

  sacarNumero.addEventListener("click", () => bingo());
})();

function bingo() {
  const child = sacarNumero.querySelector("p");
  valorBingo = valores.at(count);
  child.textContent = valorBingo;
  count++;
  const [cartonContenedorJugador, cartonContenedorOrdenador] = [
    ...main.querySelectorAll(".carton-numeros"),
  ];
  validarNumeroBingo(Array.from(cartonContenedorJugador.children));
  validarNumeroBingo(Array.from(cartonContenedorOrdenador.children));
  contenedorNumerosEscogidos.append(sacarNumero.cloneNode(true));
}

function validarNumeroBingo(children) {
  children.forEach((contenedor) => {
    const { textContent: value } = contenedor;
    if (valorBingo === Number.parseInt(value))
      contenedor.classList.add("elegido");
  });
}
