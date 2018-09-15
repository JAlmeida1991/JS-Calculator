const num = document.querySelectorAll(".num");
const answer = document.querySelector("#answer");
const clear = document.querySelector("#clear");
const screen = document.querySelector("#screen");
const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");
const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");
const btns = document.querySelectorAll(".btn");
const keys = {
  nums: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
  opperator: ["+", "-", "/", "*"],
  equal: ["="],
  clear: ["c"]
};

let currentNum;
let sum;
let arr;

init();

// Need to use function keyword since () => has no lexical this
num.forEach(num => {
  num.addEventListener("click", function(e) {
    let key = this.textContent;
    preventMultipleZeroesBeforePeriod(key);
    /* This will check if user does not want to use sum for arithmetic
     Only opperators can be added to the array... Normal integers are not added */
    if (arr.length === 1 && arr[0] === sum) {
      arr = [];
      properNumber(key);
      displayScreen(currentNum);
    } else {
      properNumber(key);
      displayScreen(currentNum);
    }
  });
});

// Operator Logic:

add.addEventListener("click", e => {
  addZeroToBeginning();
  opperator("+");
  displayScreen("+");
});

subtract.addEventListener("click", e => {
  addZeroToBeginning();
  opperator("-");
  displayScreen("-");
});

divide.addEventListener("click", e => {
  addZeroToBeginning();
  opperator("/");
  displayScreen("/");
});
multiply.addEventListener("click", e => {
  addZeroToBeginning();
  opperator("*");
  displayScreen("*");
});

answer.addEventListener("click", e => {
  if (!currentNum && arr.length === 0) {
    return;
  }
  arr.push(currentNum);
  sum = eval(arr.join(""));
  arr = [sum];
  displayScreen(sum);
  currentNum = "";
});

clear.addEventListener("click", init);

document.addEventListener("keypress", e => {
  console.log(e.key);
  let key = e.key;
  // KEY PRESS IS IN NUM ARRAY:
  if (keys.nums.indexOf(e.key) >= 0) {
    // this is set to the document object must use e.key instead of this.key
    // console.log(this);
    buttonUI(key, btns);
    preventMultipleZeroesBeforePeriod(key);
    if (arr.length === 1 && arr[0] === sum) {
      arr = [];
      properNumber(key);
      displayScreen(currentNum);
    } else {
      properNumber(key);
      displayScreen(currentNum);
    }
  }
  // KEY PRESS IS IN OPERATOR ARRAY:
  else if (keys.opperator.indexOf(e.key) >= 0) {
    buttonUI(key, btns);
    addZeroToBeginning();
    opperator(e.key);
    displayScreen(e.key);
  }
  // KEY PRESS IS IN EQUAL ARRAY
  else if (keys.equal.indexOf(e.key) >= 0) {
    buttonUI(key, btns);
    if (!currentNum && arr.length === 0) {
      return;
    }
    arr.push(currentNum);
    sum = eval(arr.join(""));
    arr = [sum];
    displayScreen(sum);
    currentNum = "";
  }
  // KEY PRESS IS IN CLEAR ARRAY
  else if (keys.clear.indexOf(e.key) >= 0) {
    const key = e.key;
    buttonUI(key, btns);
    init();
  }
});

function checkPreviousOpperator() {
  return typeof arr[arr.length - 1] !== "number";
  // return arr[arr.length - 1] === "+" || arr[arr.length - 1] === "/" || arr[arr.length - 1] === "*" || arr[arr.length - 1] === "-"
}

// NUMBER MUST NOT HAVE MORE THAN ONE DECIMAL
function properNumber(key) {
  // IF KEY IS . NEED TO CHECK IF NUMBER ALREADY HAS .
  if (key === "." && currentNum.indexOf(".") === -1) {
    currentNum += key;
    // A SECOND . WILL NEVER PUT THROUGH
  } else if (key !== ".") {
    currentNum += key;
  }
  return currentNum;
}

function opperator(opperator) {
  if (checkPreviousOpperator() && !currentNum) {
    arr.pop();
    arr.push(opperator);
  }
  // CURRENTNUM NEEDS TO BE PLACED BEFORE OPPERATOR IF IT HAS A VALUE
  else if (currentNum) {
    arr.push(currentNum);
    arr.push(opperator);
    currentNum = "";
  }
  // NEEDED IF PLANNING TO ADD TO SUM SINCE CURRENTNUM IS FALSY IF USED =
  else if (!currentNum) {
    arr.push(opperator);
    currentNum = "";
  }
}

function init() {
  currentNum = "";
  sum = 0;
  arr = [];
  displayScreen("0");
}

/*NEEDED IF USER CHOOSES TO START ARRAY WITH OPERATOR.
CANNOT INITIALLY SET ARRAY AT 0 SINCE EVAL WILL NOT PRODUCE DESIRED RESULTS
I.E. eval([0333].join("")) IS 219 NOT 333 */
function addZeroToBeginning() {
  if (arr.length === 0 && currentNum === "") {
    arr.push(0);
  }
}

// This will prevent user from entering extra leading zeroes
function preventMultipleZeroesBeforePeriod(key) {
  if (currentNum === "0" && currentNum.length <= 1 && key !== ".") {
    currentNum = "";
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
  if (!keys.opperator.includes(key) && !keys.equal.includes(key)) {
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
