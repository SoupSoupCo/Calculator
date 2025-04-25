let mathToken = [];
let wasClicked = false;
let operatorWasClicked = false;
let enteredNum = false;
let hasValue = false;

//Nodes for the DOM
const display = document.querySelector("#display");
const operands = document.querySelectorAll(".operand");
const clear = document.querySelector(".clear");
const sign = document.querySelector(".sign");
const equals = document.querySelector(".equals");
const buttons = document.querySelectorAll("button");
const symbols = document.querySelectorAll(".symbol");
const decimal = document.querySelector(".decimal");
const percent = document.querySelector(".percent");

//Math functions
function addFunction(value1, value2) {
    return (Number(value1) + Number(value2));
}

function subtractFunction(value1, value2) {
    return (value1 - value2).toFixed(2);
}

function multiplyFunction(value1, value2) {
    return (value1 * value2).toFixed(2);
}

function divideFunction(value1, value2) {
    return (Number(value1) / Number(value2)).toFixed(2);
}


function operate(token) {
    let result;
    let num1;
    let symbol;
    let num2;


    num1 = token[0];
    symbol = token[1];
    num2 = token[2];

    if(!Number.isInteger(num1) && !Number.isInteger(num2)) {
        mathToken = [];
        operatorWasClicked = false;
        hasValue = false; 
    }

    parseInt(num1);
    parseInt(num2);


    switch(symbol) {
        case "+":
            result = addFunction(num1,num2);
            display.textContent = result;
            mathToken = [];
            getValue();
            operatorWasClicked = false;
            hasValue = true;
            console.log(mathToken);
            break;
        case "/":
            result = divideFunction(num1,num2);
            display.textContent = result;
            mathToken = [];
            getValue();
            operatorWasClicked = false;
            hasValue = true;
            break;
        case "-":
            result = subtractFunction(num1,num2);
            display.textContent = result;
            mathToken = [];
            getValue();
            operatorWasClicked = false;
            hasValue = true;
            break;
        case "*":
            result = multiplyFunction(num1,num2);
            display.textContent = result;
            mathToken = [];
            getValue();
            operatorWasClicked = false;
            hasValue = true;
            break;
    }
}




//This is to update the max length of the display.
let maxLength = 13;
function updateDisplay() {
    if(display.textContent.length >= maxLength) {
        operands.stopPropagation("click", () => {});
    };
}

//Handles the buttons for the numbers being displayed to the dom.
operands.forEach((button) => {
    button.addEventListener("click", (e) => {
        enteredNum = true;
        if (display.textContent.length >= maxLength){
            e.stopPropagation();
        } else if (display.textContent.length < maxLength) {
            if(display.textContent === "0" || display.textContent.includes("+") || display.textContent.includes("*") || display.textContent.includes("/") || display.textContent.includes("-")) {
                display.textContent = button.textContent;
            } else if (wasClicked === true) {
                display.textContent += button.textContent;
            } else 
                display.textContent += button.textContent;
        }
    });
});

let addDecimal = decimal.addEventListener("click", () => {
    if(display.textContent.includes("+") || display.textContent.includes("*") || display.textContent.includes("/") || display.textContent.includes("-")){
        display.textContent = "0.";
    }
    if(!display.textContent.includes(".")){
        display.textContent += ".";
    } else {
        display.textContent += "";
    }
});

//Which symbol should be used for what operation.
symbols.forEach((symbol) => {
    symbol.addEventListener("click", (e) => {
        if (enteredNum === false) { 
            e.stopPropagation();
        } else if (mathToken.length === 3) { //Calculate first 3 values. Get result, display it. Then calculate again.
            operate(mathToken);
            display.textContent = mathToken[0];
            getValue();
            operate(mathToken);
            return operatorWasClicked = true;
        } else if (hasValue === true) {
            display.textContent = symbol.textContent;
            getValue();
            return operatorWasClicked = true;
        } else
            getValue();
            display.textContent = symbol.textContent;
            getValue();
            return operatorWasClicked = true;
    });
});

//To get the percentage.
percent.addEventListener("click", ()=> {
    let number = Number(display.textContent);
    let percentage = ((number/100));
    if(percentage.length >= maxLength){
        return display.textContent = "Num 2 Large.";
    } else
    display.textContent = percentage;
    return percentage;
});

//To get the value that's printed on the display.
function getValue() {
    mathToken.push(display.textContent);
    return mathToken;
}

clear.addEventListener("click", ()=> {
    display.textContent = "0";
    mathToken = [];
});


equals.addEventListener("click", (e)=> {
    if(display.textContent === "8008132") {
        alert('chill.');
    } else if(operatorWasClicked === false) {
        e.preventDefault();
    } else if (operatorWasClicked === true) {
        getValue();
        operate(mathToken);
        wasClicked = true;
    }
});

sign.addEventListener("click", (e)=> {
    if (display.textContent.includes("+") || display.textContent.includes("*") || display.textContent.includes("/") || display.textContent.includes("-")){
        e.preventDefault();
    } else if (display.textContent.includes("+") || display.textContent.includes("*") || display.textContent.includes("/") && display.textContent.includes("-")){
        display.textContent.replace("-","");
    } else {
        display.textContent = "-" + display.textContent;
    }
});

