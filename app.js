const calculator = document.getElementById('calculator')

calculator.addEventListener('click', (e) => {
    const numpad = e.target;

    if (!numpad.matches('.numpad')) return;

    const action = numpad.dataset.action;
    const value = numpad.dataset.value;

    handleButtonClick(action, value)
})

let displayedInput = '';
let operator = '';
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
        case 'addition':
            addition();
            break;
        case 'subtraction':
            subtraction();
            break;
        case 'multiplication':
            multiplication();
            break;
        case 'division':
            division();
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
    console.log(currentInput);
}

function clear() {
    currentInput = 0;
    displayedInput = '';
    updateDisplay();
}

function clearAll() {
    clear();
    previousInput = 0;
    previousDisplay();
}

function addition() {
    previousInput = currentInput;
    operator = 'addition'
    previousDisplay();
    clear();
}

function subtraction() {
    previousInput = currentInput;
    operator = 'subtraction'
    previousDisplay();
    clear();
}

function multiplication() {
    previousInput = currentInput;
    operator = 'multiplication'
    previousDisplay();
    clear();
}

function division() {
    previousInput = currentInput;
    operator = 'division'
    previousDisplay();
    clear();
}

function equals() {
    let result;

    switch (operator) {
        case 'addition':
            result = previousInput + currentInput;
            break;
        case 'subtraction':
            result = previousInput - currentInput;
            break;
        case 'multiplication':
            result = previousInput * currentInput;
            break;
        case 'division':
            result = previousInput / currentInput;
            break;
        default:
            return;
    }

    displayedInput = result.toString();
    currentInput = result;
    previousInput = result;
    operator = '';
    updateDisplay();
    previousDisplay();
}
