const num = document.querySelectorAll(".num");
const answer = document.querySelector("#answer");
const clear = document.querySelector("#clear");
const screen = document.querySelector("#screen");
const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");
const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");
const currentNum = {
    num: ""
};

let sum = 0;
let arr = [];
// let arr = [0];


num.forEach(num => {
    num.addEventListener("click", function (e) {
        let key = this.textContent;
        if (arr.length === 1 && arr[0] === sum) {
            arr = [];
            properNumber(key);
            screen.textContent = currentNum.num;
        } else {
            properNumber(key);
            screen.textContent = currentNum.num;
        }
    })
});

add.addEventListener("click", function (e) {
    addZeroToBeginning();
    opperator("+");
    screen.textContent = "+";
});

subtract.addEventListener("click", function (e) {
    addZeroToBeginning();
    opperator("-");
    screen.textContent = "-";
});

divide.addEventListener("click", function (e) {
    addZeroToBeginning();
    opperator("/");
    screen.textContent = "/";
});
multiply.addEventListener("click", function (e) {
    addZeroToBeginning();
    opperator("*");
    screen.textContent = "*";
});

answer.addEventListener("click", function () {
    arr.push(currentNum.num);
    // divideByZero();
    sum = (eval(arr.join("")));
    arr = [sum];

    console.log(sum);
    screen.textContent = sum;
    currentNum.num = "";
})



function checkPreviousOpperator() {
    return typeof arr[arr.length - 1] !== "number";
    // return arr[arr.length - 1] === "+" || arr[arr.length - 1] === "/" || arr[arr.length - 1] === "*" || arr[arr.length - 1] === "-"
}



// NUMBER MUST NOT HAVE MORE THAN ONE DECIMAL
function properNumber(key) {
    // IF KEY IS . NEED TO CHECK IF NUMBER ALREADY HAS .
    if (key === "." && currentNum.num.indexOf(".") === -1) {
        currentNum.num += key;
        console.log(currentNum.num);
        // A SECOND . WILL NEVER PUT THROUGH    
    } else if (key !== ".") {
        currentNum.num += key;
        console.log(currentNum.num);
    }
    return currentNum.num;
}

function opperator(opperator) {
    if (checkPreviousOpperator() && !currentNum.num) {
        arr.pop();
        arr.push(opperator);
        console.log(arr);
    } else if (arr[arr.length - 1] === "" && !currentNum.num) {
        arr.pop();
    } else {
        // CURRENTNUM NEEDS TO BE PLACED BEFORE OPPERATOR IF IT HAS A VALUE
        if (currentNum.num) {
            arr.push(currentNum.num);
            arr.push(opperator);
            currentNum.num = "";
            console.log(arr);
        }
        // NEEDED IF PLANNING TO ADD TO SUM SINCE CURRENTNUM IS FALSY IF USED =
        else if (!currentNum.num) {
            arr.push(opperator);
            // arr.push(currentNum.num);
            currentNum.num = "";
            console.log(arr);

        }
    }
}

// NEEDED IF USER CHOOSES TO START ARRAY WITH OPERATOR.
// CANNOT INITIALLY SET ARRAY AT 0 SINCE EVAL WILL NOT PRODUCE DESIRED RESULTS
// I.E. eval([0333].join("")) IS 219 NOT 333
function addZeroToBeginning() {
    if (arr.length === 0 && currentNum.num === "") {
        arr.push(0);
    }
}