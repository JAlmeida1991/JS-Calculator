import { num, answer, clear, add, subtract, divide, multiply } from "./globals";
import {
  init,
  calcNumber,
  calcAdd,
  calcSubtract,
  calcDivide,
  calcmultiply,
  calcAnswer,
  calcKeyPress
} from "./helpers";

window.addEventListener("load", init);
clear.addEventListener("click", init);
num.forEach(n => n.addEventListener("click", calcNumber));
add.addEventListener("click", calcAdd);
subtract.addEventListener("click", calcSubtract);
divide.addEventListener("click", calcDivide);
multiply.addEventListener("click", calcmultiply);
answer.addEventListener("click", calcAnswer);
document.addEventListener("keypress", calcKeyPress);
