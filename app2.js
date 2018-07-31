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
let arr = [0];


num.forEach(num => {
    num.addEventListener("click", function (e) {
        let key = this.textContent
        if (arr.length === 1 && arr[0] === sum) {
            arr = [0];
            properNumber(key);
        } else {
            properNumber(key);
        }
    })
});

add.addEventListener("click", function (e) {
    opperator("+");
});

subtract.addEventListener("click", function (e) {
    opperator("-");
});

divide.addEventListener("click", function (e) {
    opperator("/");
});
multiply.addEventListener("click", function (e) {
    opperator("*");
});

answer.addEventListener("click", function () {
    arr.push(currentNum.num);
    divideByZero();
    sum = (eval(arr.join("")));
    arr = [sum];
    console.log(sum);
    currentNum.num = "";
})



function checkPreviousOpperator() {
    return arr[arr.length - 1] === "+" || arr[arr.length - 1] === "/" || arr[arr.length - 1] === "*" || arr[arr.length - 1] === "-"
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

function divideByZero() {
    if (arr.join("").indexOf("/0") > -1) {
        return console.log("You can't divide by zero!");
    }
}