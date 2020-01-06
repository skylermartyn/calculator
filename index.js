// Global variables
const screen = document.getElementById('screen');

// Basic Functions

/*
Adds two values together
:param a: <number> First number to be added
:param b: <number> Second number to be added
:return: <number> Sum of a & b
*/
function add (a, b) {
    return a + b
}

/*
Subtracts one value from another
:param a: <number> First number to subtract from
:param b: <number> Second number to be subtracted
:return: <number> Difference of a & b
*/
function subtract (a, b) {
    return a - b
}

/*
Multiplies two values
:param a: <number> First number to be multiplied
:param b: <number> Second number to be multiplied
:return: <number> Product of a & b
*/
function multiply (a, b) {
    return a * b
}

/*
Divides two values
:param a: <number> Dividend
:param b: <number> Divisor
:return: <number> Quotient of a & b
*/
function divide (a, b) {
    return a / b
}

/*
Preforms an operation based
:param operator: <function> Operator nume that correlates with a function name 
:param a: <number> First number to operated on
:param b: <number> Second number to be operated on
:return: <number> Result of operation
*/
function operate (operator, a, b) {
    return operator(a, b)
}

/*
Clears array for calcButton press history
:param arr: <array> Array to be cleared
*/
function clear (arr) {
    arr = [{type: 'number', value: ''}];
}

/*
Adds two values together
:param arr: <array> history 
:param b: <number> Second number to be added
:return: <number> Sum of a & b
*/
function equals (arr) {
    
}

function buttonPress(e) {
    const val = e.target.innerText;
    const lastPress = history[history.length - 1];
    let lastPressisNumber = lastPress.type == 'number';
    let begin = lastPress.type == 'head';

    if ((begin || lastPressisNumber) && !isNaN(Number(val))) {
        lastPress.value += val;
        console.log(val);
        console.log(!isNaN(Number(val)));
        lastPress.type = 'number';
        screen.innerText = lastPress.value;
        console.log(history);
    } else {
        if (!isNaN(Number(val))) {
            history.push({type: 'number', value: val});
            screen.innerText = lastPress.value;
            console.log(history);
        } else if (val == '='){
            equals(history);
        } else if (lastPress.type != 'head') {
            const type = 'operator';
            let value = -1;
            switch (true) {
                case (val == '+'):
                    value = 10;
                    break;
                case (val == '-'):
                    value = 11;
                    break;
                case (val == 'X'):
                    value = 12;
                    break;
                case (val == '÷'):
                    value = 13;
                    break;
                case (val == 'CE'):
                    value = 14;
                    break;
            }
            history.push({type, value});
            screen.innerText = 'val';
            console.log(history);
        }
    }
}

let history = [{type: 'number', value: ''}];
// Bind event listeners to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', e => buttonPress(e));
});







