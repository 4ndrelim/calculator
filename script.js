/**
 * State variables
 * Numbers represented as string to avoid integer overflow
 */
const operators = ['+', '-', '×', '÷', '^']
let operandOne = '';
let operandTwo = '';
let appliedOperation = null;
let evaluated = true;
let operandTwoTrack = '';

/**
 * Access buttons
 */
const allNumbers = document.querySelectorAll('.numbers');
const allOperations = document.querySelectorAll('.operators');
const screenView = document.querySelector('#screen');
const equalsBtn = document.querySelector('#equal');
const delBtn = document.querySelector('#delete');
const allClearBtn = document.querySelector('#all-clear');
const toggleSignBtn = document.querySelector('#toggle-sign');
const decimalBtn = document.querySelector('#dot');


/**
 * Event listeners
 */
allNumbers.forEach(numBtn => numBtn.addEventListener('click', () => displayNumber(numBtn.textContent)));
allOperations.forEach(opBtn => opBtn.addEventListener('click', () => specifyOp(opBtn.textContent)));
delBtn.addEventListener('click', deletePrevious);
equalsBtn.addEventListener('click', evaluate);
allClearBtn.addEventListener('click', allClear);
decimalBtn.addEventListener('click', makeDecimal);
toggleSignBtn.addEventListener('click', makeNegative);


/**
 * Implement functions
 */

// clears screen
function screenReset() {
    screenView.textContent = '';
}

// default display
function allClear() {
    screenView.textContent = '0';
    operandOne = '';
    operandTwo = '';
    appliedOperation = null;
    evaluated = true;
    operandTwoTrack = '';
}

function displayNumber(number) {
    if (screenView.textContent === '0' || evaluated) {
        allClear();
        screenReset();
    }
    // since an operation has been specified, the call to this function must therefore be meant for operandTwo
    if (appliedOperation !== null) {
        operandTwoTrack += number;
    }
    // update display
    screenView.textContent += number;
    evaluated = false;
}

function deletePrevious() {
    if (evaluated) {
        return;
    }
    let content = screenView.textContent;
    // check if the prev char represents an operator
    if (operators.includes(content.charAt(content.length-1))) {
        appliedOperation = null;
    }
    // if its just a number, remove it
    screenView.textContent = content.slice(0,-1);
    // revert to default display
    if (screenView.textContent === '') {
        allClear();
    }
    // make sure to update operandTwo tracker so operandTwo correctly excludes numbers removed
    if (operandTwoTrack !== '') {
        operandTwoTrack = operandTwoTrack.slice(0,-1);
    }
}

function specifyOp(operator) {
    // check if there already exists a valid operation
    evaluate();
    // make sure no two operators are together
    if (appliedOperation !== null && !evaluated) {
        alert("Only one operation allowed! Delete existing operator instead!");
        return;
    }
    // since an operator is to be applied, the operation has yet to be evaluted
    evaluated = false;
    // operandOne takes on whatever value is currently displayed
    operandOne = screenView.textContent;
    appliedOperation = operator;
    screenView.textContent = `${operandOne}${appliedOperation}`;
}

function evaluate() {
    // assign operandTwo to be whatever number tracked by its tracker
    operandTwo = operandTwoTrack;
    // if not a valid operation, do not evaluate
    if (operandOne === '' || operandTwo === '' || appliedOperation === null) {
        return;
    }
    // display result
    screenView.textContent = roundOff(operate(appliedOperation, operandOne, operandTwo));
    // done evaluating. operandTwo reverts to null
    appliedOperation = null;
    operandTwo = '';
    operandTwoTrack = '';
    evaluated = true;
}

function makeDecimal() {
    let content = screenView.textContent;
    // invalid when prev is an operator and when number that will be the first operand is already a decimal
    if ((appliedOperation === null && content.includes('.')) || operators.includes(content.charAt(content.length-1))) {
        alert("Invalid placement of '.'")
        return;
    }

    screenView.textContent += '.';
    if (operandTwoTrack !== '') {
        if (operandTwoTrack.includes('.')) {
            return;
        }
        operandTwoTrack += '.';
    }
    evaluated = false;
}

function makeNegative() {
    // need to use a diff char to denote negative sign or alter implementation of specifyOp
    alert("Coming Soon!");
}

// display up to 10dp
function roundOff(number) {
    return Math.round(number * 10000000000) / 10000000000;
}

/**
 * Operations
 */

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
    if (b === 0) {
        return NaN;
    }
    return a / b;
}

function power(a, b) {
    return Math.pow(a, b);
    // let ret = 1;
    // if (b === 0) {
    //     return ret;
    // }
    // if (a === 0) {
    //     return 0;
    // }

    // if (b > 0) {
    //     for (let i = 0; i < b; i++) {
    //         ret *= a;
    //     }
    // } else {
    //     for (let i = 0; i < b; i++) {
    //         ret /= a;
    //     }
    // }
    // return ret;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        case '^':
            return power(a, b);
        default:
            return null;
    }
}