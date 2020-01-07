// Global variables
const screenText = document.getElementById('screen-text');
let history = [{type: 'number', value: ''}];

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
Clears the calculator history and screen
*/
function clear () {
    history = [{type: 'number', value: ''}];
    screenText.innerText = '';
}

/*
Computes result of calculator input
*/
function equals () {
    let a = 0;
    let op = 1;
    let b = 2;
    // Computes multiplication & division
    while (b < history.length) {
        if (history[op].value == 12) {
            history.splice(a, 3, {type: 'number', value: 
                                multiply(Number(history[a].value), Number(history[b].value))});
        } else if (history[op].value == 13) {
            history.splice(a, 3, {type: 'number', value: 
                                divide(Number(history[a].value), Number(history[b].value))});
        } else {
            a += 2;
            op += 2;
            b += 2;
        }
    }

    while (history.length != 1) {
        a = 0;
        op = 1;
        b = 2;
        while (b < history.length) {
            if (history[op].value == 10) {
                history.splice(a, 3, {type: 'number', value: 
                                    add(Number(history[a].value), Number(history[b].value))});
            } else if (history[op].value == 11) {
                history.splice(a, 3, {type: 'number', value: 
                                    subtract(Number(history[a].value), Number(history[b].value))});
            } else {
                a += 2;
                op += 2;
                b += 2;
            }
        }
    }

    history[0].value = history[0].value.toString();
    screenText.innerText = history[0].value;
    console.log(history);
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
        screenText.innerText = lastPress.value;
        console.log(history);
    } else {
        if (!isNaN(Number(val))) {
            if (val == '0' && lastPress.value == 13) {
                alert(`
                Division of ${history[history.length - 2].value} by zero has caused 
                the formation of a wormhole, bringing you back to 
                the moment before the division, thank god.`);
                return
            }
            history.push({type: 'number', value: val});
            screenText.innerText = history[history.length - 1].value;
            console.log(history);
        } else if (val == '='){
            if (!lastPressisNumber) {
                alert(`
                Complete the operation with another number`)
                return
            }
            equals();
        } else if (val == 'CE') {
            clear();
            return
        } else if (lastPress.type != 'head' && lastPress.type !== 'operator') {
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
            }
            history.push({type, value});
            screenText.innerText = val;
            console.log(history);
        }
    }
}

// Bind event listeners to buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', e => buttonPress(e));
});