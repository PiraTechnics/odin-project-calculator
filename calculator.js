//Grab all our calculator buttons and assign to nodes and nodelists
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operand]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const prevOperation = document.querySelector('[data-prev-operand]');
const currOperation = document.querySelector('[data-curr-operand]');
const decimalButton = document.querySelector('[data-decimal]');

//global vars for calculation
let currVal = null;
let prevVal1 = prevVal2 = null;
let operand = null;
let displayFormula = '';

//Set Number buttons functionality
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        currVal = (currVal) ? currVal + button.innerText : button.innerText;
        currVal = trimDecimals(currVal);
        updateDisplay();
    });
});

//Set Decimal button functionality
decimalButton.addEventListener('click', () => {
    //Only allow the '.' to be used once in current operation
    //And don't do anything if we dont have any numbers yet
    if (currVal) {
        if (currVal.indexOf('.') != -1) {
            //we've already had a decimal, break here
            return;
        }
        currVal += decimalButton.innerText;
        currVal = trimDecimals(currVal);
    }
    else {
        currVal = "0" + decimalButton.innerText;
    }

    updateDisplay();
});

//Set Operation buttons functionality
operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        operand = button.innerText;

        if (currVal) {
            prevVal1 = currVal;
            currVal = null; //reset currVal
        }
        displayFormula = prevVal1 + " " + operand; //update displayFormula
        updateDisplay();
    });
});

//Set Equals button functionality
equalsButton.addEventListener('click', () => {

    if (operand == null || prevVal1 == null) {
        return;
    }

    prevVal2 = currVal;
    currVal = operate(prevVal1, prevVal2, operand);
    displayFormula = prevVal1 + " " + operand + " " + prevVal2 + " =";
    updateDisplay();
    operand = null; //reset operand
    prevVal1 = currVal;
    prevVal2 = null;
    currVal = null;
});

//Set AC button functionality
allClearButton.addEventListener('click', () => {
    prevVal1 = prevVal2 = operand = currVal = null;
    displayFormula = "";
    updateDisplay();
});

//Set DEL button functionality
deleteButton.addEventListener('click', () => {
    currVal = null;
    updateDisplay();
});

//Helper Functions
function updateDisplay() {
    prevOperation.innerText = displayFormula;
    currOperation.innerText = (currVal) ? currVal : "0";
}

function trimDecimals(numtoTrim) {
    let stringVal = numtoTrim.toString();
    if(stringVal.length > 12) {
        stringVal = stringVal.substring(0,12);
    }
    return stringVal;
}

//Calculator Functions
function operate(a, b, operator) {
    //do maffs
    let result = 0;
    a = Number(a);
    b = Number(b);
    if (operator == '+') { result = add(a, b); }
    else if (operator == '-') { result = subtract(a, b); }
    else if (operator == '*') { result = multiply(a, b); }
    else if (operator == '/') {
        if (b == 0) { //no dividing by 0
            console.log("Can't divide by 0!");
            result = "Nope.jpg!";
        }
        else {
            result = divide(a, b);
        }
    }
    else {
        console.log("Invalid operator!");
    }

    return trimDecimals(result);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}
