const calculator = document.getElementById('calculator')
let currentInput = '';

calculator.addEventListener('click', (e) => {
    const numpad = e.target;

    if (!numpad.matches('.numpad')) return;

    const action = numpad.dataset.action;
    const value = numpad.dataset.value;

    updateDisplay(0)
    handleButtonClick(action, value)
})

function updateDisplay(value) {
    const display = document.getElementById('current-display')
    display.textContent = value || '0';
}

function handleButtonClick(action, value) {
    switch (action) {
        case 'number':
            addNumber(value);
            break;
        case 'clear':
            //clear();
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

