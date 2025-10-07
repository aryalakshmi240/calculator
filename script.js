
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (isNumber(value) || value === '.') {
            handleNumber(value);
        } else if (isOperator(value)) {
            handleOperator(value);
        } else if (value === '=') {
            handleEquals();
        } else if (value === 'C') {
            handleClear();
        }
    });
});

function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function isOperator(value) {
    return ['+', '-', '*', '/', '%'].includes(value);
}

function handleNumber(value) {
    if (currentInput.includes('.') && value === '.') return;
    currentInput += value;
    updateDisplay();
}

function handleOperator(value) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = value;
    previousInput = currentInput;
    currentInput = '';
}

function handleEquals() {
    if (previousInput === '' || currentInput === '') return;
    calculate();
    operator = '';
}

function handleClear() {
    currentInput = '';
    operator = '';
    previousInput = '';
    updateDisplay('0');
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
    updateDisplay();
}

function updateDisplay(value) {
    display.textContent = value || currentInput || '0';
}
