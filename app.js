const calculator = document.getElementById('calculator')

let displayedInput = '';
let operator = null;
let currentInput = 0;
let previousInput = 0;

operatorDisplay();
updateDisplay();
previousDisplay();

calculator.addEventListener('click', (m) => {
    const numpad = m.target;

    if (!numpad.matches('.numpad')) return;

    const action = numpad.dataset.action;
    const value = numpad.dataset.value;

    console.log("Clicked: ", {numpad, action, value})

    handleButtonClick(action, value)
})

document.addEventListener('keydown', (k) => {
    const key = k.key;

    if (key >= 0 && key <= 9) {
        addNumber(key);
    }
    console.log("Keypress: " + key)

    switch (key) {
        case 'Backspace':
            clear()
            break;
        case 'Delete':
            clearAll();
            break;
        case '+':
        case '-':
        case '*':
        case 'x':
        case 'X':
        case '/':
        case '^':
        case '%':
            arithmetic()
            operator = key;
            operatorDisplay();
            break;
        case '.':
            addDecimal();
            break;
        case 'Enter':
            equals();
            break;
    }
})

function updateDisplay() {
    const display = document.getElementById('current-display')
    display.textContent = displayedInput || '0';
}

function previousDisplay() {
    const previousDisplay = document.getElementById('previous-display')
    previousDisplay.textContent = previousInput || '0';
}

function operatorDisplay() {
    const operatorDisplay = document.getElementById('operator-display')
    switch (operator) {
        case '*':
            operatorDisplay.textContent = '×' || '';
            break;
        case '**':
            operatorDisplay.textContent = '^' || '';
            break;
        case '/':
            operatorDisplay.textContent = '÷' || '';
            break;
        default:
            operatorDisplay.textContent = operator || '';
    }
}

function handleButtonClick(action, value) {
    switch (action) {
        case 'number':
            addNumber(value);
            break;
        case 'decimal':
            addDecimal();
            break;
        case 'clear':
            clear();
            break;
        case 'clear-all':
            clearAll();
            break;
        case 'operator':
            arithmetic();
            operator = value;
            operatorDisplay();
            break;
        case 'equals':
            equals();
            break;
    }
}

function addNumber(num) {

    if (displayedInput.length <= 12) {
        displayedInput += num;
    }
    updateDisplay(displayedInput);
    currentInput = parseFloat(displayedInput);
}

function addDecimal() {
    if (displayedInput.includes('.')) {
        return;
    } else if (displayedInput === '') {
        displayedInput = '0.';
    } else {
        displayedInput += '.';
    }

    currentInput = parseFloat(displayedInput);
    updateDisplay(displayedInput);
    console.log("Current input = " + currentInput);
}

function clear() {
    displayedInput = '';
    operator = null;
    currentInput = 0;

    operatorDisplay();
    updateDisplay();
}

function clearAll() {
    clear();
    previousInput = 0;
    previousDisplay();
}

function arithmetic() {
    if (operator !== null && displayedInput !== '') {
        equals();
    }

    if (displayedInput !== '') {
        previousInput = currentInput;
        previousDisplay();
    }
    clear();
}

function equals(prev, op, curr) {

    //Comment these 3 lines below to use the equals function by itself
    op = operator;
    prev = previousInput;
    curr = currentInput;

    console.log("Values: ", {prev, op, curr});

    let result = 0;

    switch (op) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '^':
            result = prev ** curr;
            break;
        case '/':
            result = prev / curr;
            break;
        case '%':
            result = (prev/100) * curr;
            break;
        case '':
            result = curr;
            break;
        default:
            console.error('No valid operator');
    }

    result = parseFloat(result.toPrecision(12));
    console.log(result);

    //Update statements
    displayedInput = result.toString();
    operator = '';
    currentInput = result;
    previousInput = result;

    operatorDisplay();
    updateDisplay();
    previousDisplay();

    return result;
}