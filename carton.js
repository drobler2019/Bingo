export class Carton {
  constructor(nombre, valores) {
    this.nombre = nombre;
    this.valores = valores;
  }
  get carton() {
    const template = document.querySelector("#template-carton");
    const { firstElementChild: elemento } = template.content.cloneNode(true);
    const titulo = elemento.querySelector("h2");
    titulo.textContent = this.nombre.toUpperCase();
    const templateNumero = document.querySelector("#template-numero-carton");
    this.valores.forEach((valor) => {
      const { firstElementChild: div } = templateNumero.content.cloneNode(true);
      div.className = "numero";
      div.firstElementChild.textContent = valor;
      elemento.lastElementChild.append(div);
    });
    return elemento;
  }
}
