const calculator = document.getElementById('calculator')

let displayedInput = '';
let operator = null;
let currentInput = 0;
let previousInput = 0;

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
        case '*': case 'x': case 'X':
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

operatorDisplay();
updateDisplay();
previousDisplay();

calculator.addEventListener('click', (m) => {
    const numpad = m.target;

    if (!numpad.matches('.numpad')) return;

    const action = numpad.dataset.action;
    const value = numpad.dataset.value;

    console.log("Clicked: ", {numpad, action, value})

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
        case 'paste':
            paste();
            break;
        case 'equals':
            equals();
            break;
    }
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
        case '+': case '-': case '*': case 'x': case 'X': case '/': case '^': case '%':
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

async function paste() {
    if (navigator.clipboard && navigator.clipboard.readText) {
        try {
            const clipboardText = await navigator.clipboard.readText();
            const pastedNum = clipboardText.trim()
            
            if (isNaN(pastedNum)) {
                alert(`${pastedNum} is not a valid number`);
                return null;
            } else {
                console.log(pastedNum);
                addNumber(pastedNum);
            }
        } catch (e) {
            console.error(e);
        }
    }
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
        case '**':
        case '^':
            result = prev ** curr;
            break;
        case '/':
            result = prev / curr;
            break;
        case '%':
            result = (prev / 100) * curr;
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