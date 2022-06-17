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
    return a / b;
}

function power(a, b) {
    let ret = 1;
    if (b === 0) {
        return ret;
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