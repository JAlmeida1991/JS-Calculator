// const num = document.querySelectorAll(".num");
// const answer = document.querySelector("#answer");
// const clear = document.querySelector("#clear");
// const screen = document.querySelector("#screen");
// // console.log(num);

// let arr = [];

// for (let i = 0; i < num.length; i++) {
//     num[i].addEventListener("click", function (e) {
//         // console.log(this.textContent);
//         if (!((this.textContent === ".") && (arr[arr.length - 1] === "."))) {
//             arr.push(this.textContent);
//             console.log(arr);
//             screen.textContent = arr.join("");
//         }
//     })
// }

// function doMath() {
//     // Needed in order to turn array into string
//     // eval will evaluate the code
//     return eval(arr.join(""));
// }

// answer.addEventListener("click", function () {
//     // Needed since if arr is empty will return undefined
//     if (arr.length === 0) {
//         // return console.log(0);
//         screen.textContent = 0;
//     }
//     screen.textContent = doMath();
// });

// clear.addEventListener("click", function () {
//     arr = [];
//     screen.textContent = 0;
// })


// V2:
const num = document.querySelectorAll(".num");
const answer = document.querySelector("#answer");
const clear = document.querySelector("#clear");
const screen = document.querySelector("#screen");
const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");
const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");
// // console.log(num);

let arr = [];
let number = "";
// num.indexOf(".") === - 1 add "." (does not contain ".") else do not add
// push num to arr if used opperator && declare num as ""


for (let i = 0; i < num.length; i++) {
    num[i].addEventListener("click", function (e) {
        let key = e.target.textContent;
        properNumber(key);
    })

}

function properNumber(key) {
    if (key === "." && number.indexOf(".") === -1) {
        number += key;
        // console.log(key);
        console.log(number);
    } else if (key !== ".") {
        number += key;
        // console.log(key);
        console.log(number);
    }
    return number;
}







function checkPreviousOpperator() {
    return arr[arr.length - 1] === "+" || arr[arr.length - 1] === "+" || arr[arr.length - 1] === "+" || arr[arr.length - 1] === "+"
}

function nextOpperator() {
    return number[0] === "+" || number[0] === "/" || number[0] === "*" || number[0] === "*"
}



// Need to fix bug that deletes opperator after using "="

add.addEventListener("click", function (e) {
    // && number[0] === "+" || number[0] === "/" || number[0] === "*" || number[0] === "*"
    if (checkPreviousOpperator() || nextOpperator()) {
        arr.pop();
        arr.push(number + "+");
        console.log(arr);
        number = "";
    } else if (!isNaN(Number(arr[arr.length - 1]))) {
        arr.push("+");
        number = "";
        console.log(arr);
    }
    // Need to refactor
    else if ((arr[arr.length - 1] - 1 !== "+") || (arr[arr.length - 1] - 1 !== "-") || (arr[arr.length - 1] - 1 !== "/") || (arr[arr.length - 1] - 1 !== "*")) {
        arr.push(number + "+");
        console.log(arr);
        number = "";
    }
});

// subtract.addEventListener("click", function (e) {
//     if (checkPreviousOpperator() || nextOpperator()) {
//         arr.pop();
//         arr.push(number);
//         arr.push("-");
//         console.log(arr);
//         number = "";
//     } else if ((arr[arr.length - 1] - 1 !== "+") || (arr[arr.length - 1] - 1 !== "-") || (arr[arr.length - 1] - 1 !== "/") || (arr[arr.length - 1] - 1 !== "*")) {
//         arr.push(number);
//         arr.push("-");
//         console.log(arr);
//         number = "";
//     }
// });

// multiply.addEventListener("click", function (e) {
//     if (checkPreviousOpperator() || nextOpperator()) {
//         arr.pop();
//         arr.push(number);
//         arr.push("*");
//         console.log(arr);
//         number = "";
//     } else if ((arr[arr.length - 1] - 1 !== "+") || (arr[arr.length - 1] - 1 !== "-") || (arr[arr.length - 1] - 1 !== "/") || (arr[arr.length - 1] - 1 !== "*")) {
//         arr.push(number);
//         arr.push("*");
//         console.log(arr);
//         number = "";
//     }
// });

// divide.addEventListener("click", function (e) {
//     if (checkPreviousOpperator() || nextOpperator()) {
//         arr.pop();
//         arr.push(number);
//         arr.push("/");
//         console.log(arr);
//         number = "";
//     } else if ((arr[arr.length - 1] - 1 !== "+") || (arr[arr.length - 1] - 1 !== "-") || (arr[arr.length - 1] - 1 !== "/") || (arr[arr.length - 1] - 1 !== "*")) {
//         arr.push(number);
//         arr.push("/");
//         console.log(arr);
//         number = "";
//     }
// });




function doMath() {
    // Needed in order to turn array into string
    // eval will evaluate the code
    arr.push(number);
    // if (arr[arr.length] - 1 === "+") {
    //     arr.pop();
    // }
    console.log(arr.join(""));
    return eval(arr.join(""));
}

answer.addEventListener("click", function () {
    // Needed since if arr is empty will return undefined
    if (arr.length === 0) {
        // return console.log(0);
        screen.textContent = 0;
    }
    screen.textContent = doMath();
});

clear.addEventListener("click", function () {
    arr = [];
    screen.textContent = 0;
})