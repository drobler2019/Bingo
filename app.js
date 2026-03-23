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

const ordenador = new Carton("cpu", cartonOrdenador);
const jugador = new Carton("player", cartonJugador);

const main = document.querySelector("main");
const contenedorNumerosEscogidos = main.querySelector(".numeros-escogidos");
const { firstElementChild: sacarNumero } = document.querySelector(".bingo");

const keyPress = (event) => {
  const { code } = event;
  if (code === "Space") bingo();
};

const clic = () => bingo();

(() => {
  main.insertAdjacentElement("afterbegin", jugador.carton);
  contenedorNumerosEscogidos.insertAdjacentElement(
    "beforebegin",
    ordenador.carton,
  );

  window.addEventListener("keypress", keyPress);
  sacarNumero.addEventListener("click", clic);
})();

function bingo() {
  const child = sacarNumero.querySelector("p");
  valorBingo = valores.at(count);
  child.textContent = valorBingo;
  count++;
  const [cartonContenedorJugador, cartonContenedorOrdenador] = [
    ...main.querySelectorAll(".carton-numeros"),
  ];
  validarNumeroBingo(cartonContenedorJugador);
  validarNumeroBingo(cartonContenedorOrdenador);
  contenedorNumerosEscogidos.append(sacarNumero.cloneNode(true));
}

function validarNumeroBingo(contenedor) {
  const children = [...contenedor.children];
  children.forEach((contenedor) => {
    const { textContent: value } = contenedor;
    if (valorBingo === Number.parseInt(value))
      contenedor.classList.add("elegido");
  });
  const total = children.filter((c) => c.classList.contains("elegido")).length;
  const titulo = contenedor.previousElementSibling.textContent;
  if (total === CANTIDAD_NUMEROS_CARTON) {
    valorBingo = 0;
    main.classList.add("juego-finalizado");
    window.removeEventListener("keypress", keyPress);
    sacarNumero.removeEventListener("click", clic);
    const { firstElementChild: modal } = document
      .querySelector("#template-modal")
      .content.cloneNode(true);
    console.log(modal);
    const pElement =
      titulo === "PLAYER"
        ? `<form><button>Cerrar</button></form><p>${titulo[0] + titulo.slice(1).toLowerCase()} has ganado!</p>`
        : `<form><button>Cerrar</button></form><p>¡Has perdido!</p>`;
    modal.innerHTML = pElement;
    document.body.append(modal);
    modal.showModal();
  }
}
