/**
 * State variables
 * Numbers represented as string to avoid integer overflow
 */
let operandOne = '';
let operandTwo = '';
let appliedOperaton = null;
let toReset = false;


/**
 * Access buttons
 */
const allNumbers = document.querySelector('.numbers');
const allOperations = document.querySelector('.operations');
const screenView = document.querySelector('#screen');
const equalsBtn = document.querySelector('#equal');
const clearBtn = document.querySelector('#clear');
const allClearBtn = document.querySelector('#all-clear');
const toggleSignBtn = document.querySelector('#toggle-sign');
const decimalBtn = document.querySelector('#dot');


/**
 * Event listeners
 */


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
        return null;
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
        case '𝑥^':
            return power(a, b);
        default:
            return null;
    }
}