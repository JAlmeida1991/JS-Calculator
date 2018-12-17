import { screen, btns, state } from "./globals";

function checkPreviousOpperator() {
  return typeof state.arr[state.arr.length - 1] !== "number";
}

// NUMBER MUST NOT HAVE MORE THAN ONE DECIMAL
function properNumber(key) {
  // IF KEY IS . NEED TO CHECK IF NUMBER ALREADY HAS .
  if (key === "." && state.currentNum.indexOf(".") === -1) {
    state.currentNum += key;
    // A SECOND . WILL NEVER PUT THROUGH
  } else if (key !== ".") {
    state.currentNum += key;
  }
  return state.currentNum;
}

function opperator(opperator) {
  if (checkPreviousOpperator() && !state.currentNum) {
    state.arr.pop();
    state.arr.push(opperator);
  }
  // CURRENTNUM NEEDS TO BE PLACED BEFORE OPPERATOR IF IT HAS A VALUE
  else if (state.currentNum) {
    state.arr.push(state.currentNum);
    state.arr.push(opperator);
    state.currentNum = "";
  }
  // NEEDED IF PLANNING TO ADD TO SUM SINCE CURRENTNUM IS FALSY IF USED =
  else if (!state.currentNum) {
    state.arr.push(opperator);
    state.currentNum = "";
  }
}

function init() {
  state.currentNum = "";
  state.sum = 0;
  state.arr = [];
  displayScreen("0");
}

/*NEEDED IF USER CHOOSES TO START ARRAY WITH OPERATOR.
  CANNOT INITIALLY SET ARRAY AT 0 SINCE EVAL WILL NOT PRODUCE DESIRED RESULTS
  I.E. eval([0333].join("")) IS 219 NOT 333 */
function addZeroToBeginning() {
  if (state.arr.length === 0 && state.currentNum === "") {
    state.arr.push(0);
  }
}

// This will prevent user from entering extra leading zeroes
function preventMultipleZeroesBeforePeriod(key) {
  if (state.currentNum === "0" && state.currentNum.length <= 1 && key !== ".") {
    state.currentNum = "";
    displayScreen("");
  }
}

function displayScreen(val) {
  screen.textContent = val;
}

function buttonUI(key, btns) {
  // Need to call Array.from on btns since node lists do not have access to filter.
  const btnArr = Array.from(btns).filter(function(element) {
    return key === element.value;
  });
  // Destructuring in order to get value from btnArr
  const [btnKey] = btnArr;
  // If the key is not an opperator or equal, apply the following styles
  if (!state.keys.opperator.includes(key) && !state.keys.equal.includes(key)) {
    // Key will look like it is being pressed
    // after 1/4th a sceond, return orginal style
    btnKey.classList.add("toggleNumber-js");

    setTimeout(() => {
      btnKey.classList.remove("toggleNumber-js");
    }, 250);
    // Else apply the following styles for key if it is an opperator or equal
  } else {
    // Key will look like it is being pressed
    btnKey.classList.add("toggleOperator-js");
    // after 1/4th a sceond, return orginal style
    setTimeout(() => {
      btnKey.classList.remove("toggleOperator-js");
    }, 250);
  }
}

function calcNumber(e) {
  const key = this.textContent;
  preventMultipleZeroesBeforePeriod(key);
  /* This will check if user does not want to use sum for arithmetic
       Only opperators can be added to the array... Normal integers are not added */
  if (state.arr.length === 1 && state.arr[0] === state.sum) {
    state.arr = [];
    properNumber(key);
    displayScreen(state.currentNum);
  } else {
    properNumber(key);
    displayScreen(state.currentNum);
  }
}

function calcAdd() {
  addZeroToBeginning();
  opperator("+");
  displayScreen("+");
}

function calcSubtract() {
  addZeroToBeginning();
  opperator("-");
  displayScreen("-");
}

function calcAdd() {
  addZeroToBeginning();
  opperator("+");
  displayScreen("+");
}

function calcAdd() {
  addZeroToBeginning();
  opperator("+");
  displayScreen("+");
}

function calcDivide() {
  addZeroToBeginning();
  opperator("/");
  displayScreen("/");
}

function calcmultiply() {
  addZeroToBeginning();
  opperator("*");
  displayScreen("*");
}

function calcAnswer() {
  if (!state.currentNum && state.arr.length === 0) {
    return;
  }
  state.arr.push(state.currentNum);
  state.sum = eval(state.arr.join(""));
  state.arr = [state.sum];
  displayScreen(state.sum);
  state.currentNum = "";
}

function calcKeyPress(e) {
  const key = e.key;
  // KEY PRESS IS IN NUM ARRAY:
  if (state.keys.nums.indexOf(e.key) >= 0) {
    // this is set to the document object must use e.key instead of this.key
    buttonUI(key, btns);
    preventMultipleZeroesBeforePeriod(key);
    if (state.arr.length === 1 && state.arr[0] === state.sum) {
      state.arr = [];
      properNumber(key);
      displayScreen(state.currentNum);
    } else {
      properNumber(key);
      displayScreen(state.currentNum);
    }
  }
  // KEY PRESS IS IN OPERATOR ARRAY:
  else if (state.keys.opperator.indexOf(e.key) >= 0) {
    buttonUI(key, btns);
    addZeroToBeginning();
    opperator(e.key);
    displayScreen(e.key);
  }
  // KEY PRESS IS IN EQUAL ARRAY
  else if (state.keys.equal.indexOf(e.key) >= 0) {
    buttonUI(key, btns);
    if (!state.currentNum && state.arr.length === 0) {
      return;
    }
    state.arr.push(state.currentNum);
    state.sum = eval(state.arr.join(""));
    state.arr = [state.sum];
    displayScreen(state.sum);
    state.currentNum = "";
  }
  // KEY PRESS IS IN CLEAR ARRAY
  else if (state.keys.clear.indexOf(e.key) >= 0) {
    const key = e.key;
    buttonUI(key, btns);
    init();
  }
}

export {
  init,
  calcNumber,
  calcAdd,
  calcSubtract,
  calcDivide,
  calcmultiply,
  calcAnswer,
  calcKeyPress
};
