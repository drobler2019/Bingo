(() => {
  const templateNumero = document.querySelector("#template-numero-carton");
  const template = document.querySelector("#template-carton");
  const { firstElementChild: jugador } = template.content.cloneNode(true);
  const { firstElementChild: ordenador } = template.content.cloneNode(true);

  construirCartones("player", jugador, templateNumero);
  construirCartones("cpu", ordenador, templateNumero);
  document.body.append(jugador, ordenador);
})();

function construirCartones(nombre, elemento, templateNumero) {
  const titulo = elemento.querySelector("h2");
  titulo.textContent = nombre.toUpperCase();
  for (let e = 0; e < 15; e++) {
    const { firstElementChild: div } = templateNumero.content.cloneNode(true);
    div.firstElementChild.textContent = e + 1;
    elemento.lastElementChild.append(div);
  }
}
