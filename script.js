/**
 * To do:
 * 4. settle point
 * 5. settle toggling of sign
 * 6. css
 * 
 */



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
// NaN check

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
    // operandOne has been specified. The call to this function must therefore be meant for operandTwo
    if (operandOne !== '') {
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
    // check if the prev char represents an operator
    if (operators.includes(screenView.textContent.charAt(screenView.textContent.length-1))) {
        appliedOperation = null;
    }
    // if its just a number, remove it
    screenView.textContent = screenView.textContent.slice(0,-1);
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

// display up to 10dp
function roundOff(number) {
    return Math.round(number * 10000000000) / 10000000000;
}



// window.addEventListener('keydown', userKeyboardInput);

// function userKeyboardInput(e) {
//     // e.target vs e.key
//     // to add: is user keys on keyboard
//     if (0 <=e.key && e.key <= 9) {
//         addNum(e.key);
//     } else if (e.key === '.') {
//         addPoint();
//     } else if (e.key ===)
// }

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
    let ret = 1;
    if (b === 0) {
        return ret;
    }
    if (a === 0) {
        return 0;
    }

    if (b > 0) {
        for (let i = 0; i < b; i++) {
            ret *= a;
        }
    } else {
        for (let i = 0; i < b; i++) {
            ret /= a;
        }
    }
    return ret;
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