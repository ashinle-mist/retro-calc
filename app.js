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
    previousDisplay.textContent = previousInput || 'Nothing Here...';
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
    currentInput = parseInt(displayedInput);
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
    previousInput = currentInput;
    previousDisplay();
    clear();
}

function equals() {

    let result = eval(`${previousInput} ${operator} ${currentInput}`);

    displayedInput = result.toString();
    currentInput = result;
    previousInput = result;
    operator = null;
    operatorDisplay();
    updateDisplay();
    previousDisplay();
}
