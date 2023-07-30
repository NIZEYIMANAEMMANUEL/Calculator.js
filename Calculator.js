// Helper function to round the result
function roundResult(result) {
    return Math.round(result * 100) / 100;
  }
  
  // Calculator variables
  let displayValue = "0";
  let firstNumber = null;
  let operator = null;
  let secondNumber = null;
  
  // Function to update the display
  function updateDisplay() {
    const display = document.getElementById("display");
    display.textContent = displayValue;
  }
  
  // Function to clear the calculator
  function clearCalculator() {
    displayValue = "0";
    firstNumber = null;
    operator = null;
    secondNumber = null;
  }
  
  // Function to handle number button clicks
  function handleNumberClick(number) {
    if (displayValue === "0" || displayValue === "Error") {
      displayValue = number;
    } else {
      displayValue += number;
    }
    updateDisplay();
  }
  
  // Function to handle operator button clicks
  function handleOperatorClick(op) {
    if (firstNumber === null) {
      firstNumber = parseFloat(displayValue);
      operator = op;
      displayValue = "0";
    } else if (secondNumber === null) {
      secondNumber = parseFloat(displayValue);
      operate();
      operator = op;
      displayValue = "0";
    } else {
      operate();
      operator = op;
      displayValue = "0";
    }
  }
  
  // Function to handle equal button click
  function handleEqualClick() {
    if (firstNumber !== null && operator !== null && displayValue !== "Error") {
      secondNumber = parseFloat(displayValue);
      operate();
      operator = null;
    }
  }
  
  // Function to perform the operation based on the operator
  function operate() {
    switch (operator) {
      case "+":
        displayValue = roundResult(firstNumber + secondNumber);
        break;
      case "-":
        displayValue = roundResult(firstNumber - secondNumber);
        break;
      case "*":
        displayValue = roundResult(firstNumber * secondNumber);
        break;
      case "/":
        if (secondNumber === 0) {
          displayValue = "Error";
        } else {
          displayValue = roundResult(firstNumber / secondNumber);
        }
        break;
      default:
        break;
    }
    updateDisplay();
    firstNumber = parseFloat(displayValue);
    secondNumber = null;
  }
  
  // Function to handle decimal button click
  function handleDecimalClick() {
    if (!displayValue.includes(".")) {
      displayValue += ".";
    }
  }
  
  // Event listeners for button clicks
  document.querySelectorAll(".number").forEach((button) => {
    button.addEventListener("click", () => {
      handleNumberClick(button.textContent);
    });
  });
  
  document.querySelectorAll(".operator").forEach((button) => {
    button.addEventListener("click", () => {
      handleOperatorClick(button.textContent);
    });
  });
  
  document.getElementById("equals").addEventListener("click", handleEqualClick);
  
  document.getElementById("clear").addEventListener("click", () => {
    clearCalculator();
    updateDisplay();
  });
  
  document.getElementById("decimal").addEventListener("click", handleDecimalClick);
  
  // Keyboard support
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!isNaN(key) || key === ".") {
      handleNumberClick(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      handleOperatorClick(key);
    } else if (key === "Enter" || key === "=") {
      handleEqualClick();
    } else if (key === "Escape") {
      clearCalculator();
      updateDisplay();
    }
  });
  
  // Initialize the display
  updateDisplay();