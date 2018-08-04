const num = document.querySelectorAll(".num");
const answer = document.querySelector("#answer");
const clear = document.querySelector("#clear");
const screen = document.querySelector("#screen");
const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");
const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");

let currentNum;
let sum;
let arr;

init();

// const currentNum = {
//     num: ""
// };
// let arr = [0];


num.forEach(num => {
    num.addEventListener("click", function (e) {
        let key = this.textContent;
        if (arr.length === 1 && arr[0] === sum) {
            // arr = [];
            arr = [];
            properNumber(key);
            screen.textContent = currentNum;
        } else {
            properNumber(key);
            screen.textContent = currentNum;
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
    arr.push(currentNum);
    sum = (eval(arr.join("")));
    arr = [sum];
    console.log(sum);
    screen.textContent = sum;
    currentNum = "";
})


clear.addEventListener("click", function () {
    init();
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
        console.log(currentNum);
        // A SECOND . WILL NEVER PUT THROUGH    
    } else if (key !== ".") {
        currentNum += key;
        console.log(currentNum);
    }
    return currentNum;
}

function opperator(opperator) {
    if (checkPreviousOpperator() && !currentNum) {
        arr.pop();
        arr.push(opperator);
        console.log(arr);
    }
    // CURRENTNUM NEEDS TO BE PLACED BEFORE OPPERATOR IF IT HAS A VALUE
    else if (currentNum) {
        arr.push(currentNum);
        arr.push(opperator);
        currentNum = "";
        console.log(arr);
    }
    // NEEDED IF PLANNING TO ADD TO SUM SINCE CURRENTNUM IS FALSY IF USED =
    else if (!currentNum) {
        arr.push(opperator);
        // arr.push(currentNum);
        currentNum = "";
        console.log(arr);
    }

}

function init() {
    currentNum = "";
    sum = 0;
    arr = [];
    screen.textContent = 0;
}

// NEEDED IF USER CHOOSES TO START ARRAY WITH OPERATOR.
// CANNOT INITIALLY SET ARRAY AT 0 SINCE EVAL WILL NOT PRODUCE DESIRED RESULTS
// I.E. eval([0333].join("")) IS 219 NOT 333
function addZeroToBeginning() {
    if (arr.length === 0 && currentNum === "") {
        arr.push(0);
    }
}


// function opperator(opperator) {
//     if (checkPreviousOpperator() && !currentNum.num) {
//         arr.pop();
//         arr.push(opperator);
//         console.log(arr);
//     }
//     // else if (arr[arr.length - 1] === "" && !currentNum.num) {
//     //     arr.pop();
//     // } 
//     // else {
//     // CURRENTNUM NEEDS TO BE PLACED BEFORE OPPERATOR IF IT HAS A VALUE
//     else if (currentNum.num) {
//         arr.push(currentNum.num);
//         arr.push(opperator);
//         currentNum.num = "";
//         console.log(arr);
//     }
//     // NEEDED IF PLANNING TO ADD TO SUM SINCE CURRENTNUM IS FALSY IF USED =
//     else if (!currentNum.num) {
//         arr.push(opperator);
//         // arr.push(currentNum.num);
//         currentNum.num = "";
//         console.log(arr);
//     }
//     // }
// }