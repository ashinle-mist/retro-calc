const calculator = document.getElementById('calculator')

let currentInput = '';
let previousInput = '';

updateDisplay();
previousDisplay();

calculator.addEventListener('click', (e) => {
    const numpad = e.target;

    if (!numpad.matches('.numpad')) return;

    const action = numpad.dataset.action;
    const value = numpad.dataset.value;

    handleButtonClick(action, value)
})

function updateDisplay(value) {
    const display = document.getElementById('current-display')
    display.textContent = value || '0';
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
    }
}

function addNumber(num) {
    if (currentInput.length <= 12) {
        currentInput += num;
    }
    updateDisplay(currentInput);
}

function clear() {
    currentInput = '';
    updateDisplay(0);
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    updateDisplay(0);
    previousDisplay();
}

function addition() {
    previousInput = currentInput;
    previousDisplay();
}
