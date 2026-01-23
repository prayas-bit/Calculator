const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const btnText = button.textContent;

    if (button.classList.contains('clear')) {
      clear();
    } else if (button.classList.contains('back')) {
      backspace();
    } else if (button.classList.contains('equals')) {
      calculate();
    } else if (button.classList.contains('operator')) {
      handleOperator(btnText);
    } else {
      handleNumber(btnText);
    }

    updateDisplay();
  });
});

function handleNumber(num) {
  if (shouldResetDisplay) {
    currentValue = num;
    shouldResetDisplay = false;
  } else {
    if (currentValue === '0' && num !== '.') {
      currentValue = num;
    } else if (num === '.' && currentValue.includes('.')) {
      return;
    } else {
      currentValue += num;
    }
  }
}

function handleOperator(op) {
  if (operation !== null && !shouldResetDisplay) {
    calculate();
  }

  previousValue = currentValue;
  
  if (op === '×') {
    operation = '*';
  } else if (op === '−') {
    operation = '-';
  } else if (op === '%') {
    operation = '%';
  } else {
    operation = op;
  }
  
  shouldResetDisplay = true;
}

function calculate() {
  if (operation === null || shouldResetDisplay) {
    return;
  }

  let result;
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);

  switch (operation) {
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
      if (current === 0) {
        alert('Cannot divide by zero');
        clear();
        return;
      }
      result = prev / current;
      break;
    case '%':
      result = prev % current;
      break;
    default:
      return;
  }

  currentValue = result.toString();
  operation = null;
  previousValue = '';
  shouldResetDisplay = true;
}

function clear() {
  currentValue = '0';
  previousValue = '';
  operation = null;
  shouldResetDisplay = false;
}

function backspace() {
  if (currentValue.length > 1) {
    currentValue = currentValue.slice(0, -1);
  } else {
    currentValue = '0';
  }
}

function updateDisplay() {
  display.textContent = currentValue;
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9' || e.key === '.') {
    handleNumber(e.key);
  } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    handleOperator(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    calculate();
  } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
    clear();
  } else if (e.key === 'Backspace') {
    e.preventDefault();
    backspace();
  } else if (e.key === '%') {
    handleOperator('%');
  }
  
  updateDisplay();
});