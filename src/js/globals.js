const num = document.querySelectorAll(".num");
const answer = document.querySelector(".answer");
const clear = document.querySelector(".clear");
const screen = document.querySelector(".screen");
const add = document.querySelector(".add");
const subtract = document.querySelector(".subtract");
const divide = document.querySelector(".divide");
const multiply = document.querySelector(".multiply");
const btns = document.querySelectorAll(".btn");

const state = {
  keys: {
    nums: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
    opperator: ["+", "-", "/", "*"],
    equal: ["="],
    clear: ["c"]
  },
  currentNum: null,
  sum: null,
  arr: null
};

export {
  num,
  answer,
  clear,
  screen,
  add,
  subtract,
  divide,
  multiply,
  btns,
  state
};
