const calculator = document.getElementById('calculator')

calculator.addEventListener('click', (e) => {
    const numpad = e.target;

    if (!numpad.matches('numpad')) return;

    const action = numpad.dataset.action;
    const value = numpad.dataset.value;

    handleButtonClick(action, value);
})

function handleButtonClick(action, value) {

}
