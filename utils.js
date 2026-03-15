import { shuffle } from "./desornedar.js";

const CANTIDAD_NUMEROS_CARTON = 15;
const valores = shuffle(Array.from({ length: 90 }, (_, i) => i + 1));
const saltos = [0, 15, 30, 45, 60, 75];

export { CANTIDAD_NUMEROS_CARTON, valores, saltos };
