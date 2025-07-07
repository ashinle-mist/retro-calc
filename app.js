const calculator = document.getElementById('calculator')

calculator.addEventListener('click', (e) => {
    const numpad = e.target;

    if (!numpad.matches('.numpad')) return;

    const action = numpad.dataset.action;
    const value = numpad.dataset.value;

    handleButtonClick(action, value)
})

let displayedInput = '';
let operator = null;
let currentInput = 0;
let previousInput = 0;

updateDisplay();
previousDisplay();

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
    console.log("Current input = " + currentInput);
}

function addDecimal() {
    if (displayedInput.includes('.')) {
        return;
    } else if (displayedInput === '') {
        displayedInput = '0.';
    } else {
        displayedInput += '.';
    }

    updateDisplay(displayedInput);
    currentInput = parseFloat(displayedInput);
    console.log("Current input = " + currentInput);
}

function clear() {
    currentInput = 0;
    displayedInput = '';
    operator = null;
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

function equals() {

    let result = eval(`${previousInput} ${operator} ${currentInput}`);
    // result.toPrecision(12);

    displayedInput = result.toString();
    currentInput = result;
    previousInput = result;
    operator = null;
    operatorDisplay();
    updateDisplay();
    previousDisplay();
}
