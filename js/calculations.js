// variables for input storage as string types, firstNumber used as "total" counter
let firstNumber = "";
let secondNumber = "";
let operator = "";

// allows next number button press to reset calculator
// 1 when equal button pressed
// 0 when any operator pressed (indicating continuation of current calculations) or clearAll pressed (to reset calculator to default state)
let overwrite = 0;

// display updater evaluates input variable op to decide textContent format needed to show relevant information
function updateDisplay(op) {
  const calcDisplay = document.querySelector(".calc__display");
  op == "equals" ? calcDisplay.textContent = firstNumber:
  op == "operator" ? calcDisplay.textContent = `${firstNumber}${operator}`:
  op == Number(op) ? calcDisplay.textContent += op:
  calcDisplay.textContent = `${firstNumber}${operator}${secondNumber}`;
}

// clears display, clears all or only number being edited
function clearDisplay(clr) {
  const calcDisplay = document.querySelector(".calc__display");
  clr == "clearAll" ? calcDisplay.textContent = "":
  clr == "clear" ? calcDisplay.textContent = `${firstNumber}${operator}${secondNumber}`:
  console.log("clearDisplay error");
}

// takes 3 inputs and writes to total, then resets variables for subsequent inputs. converts string inputs to numbers before calculation
function operate() {
  operator === "+" ? firstNumber = Number(firstNumber) + Number(secondNumber):
  operator === "-" ? firstNumber = Number(firstNumber) - Number(secondNumber):
  operator === "*" ? firstNumber = Number(firstNumber) * Number(secondNumber):
  operator === "/" ? firstNumber = Number(firstNumber) / Number(secondNumber):
  operator === "^" ? firstNumber = Number(firstNumber) ** Number(secondNumber):
  console.log("operate() error");

  secondNumber = "";
  operator = "";
}

// function used by each number button, adds each button press as a string
function pressNum() {
  // as described under variables
  if (overwrite) {clearAll()};

  // if no operator pressed edit first number, else edit second number
  operator === "" ? firstNumber += this.value:
  secondNumber += this.value;

  // feeds display updater with value from button press
  updateDisplay(this.value);
}

// function used by each operator
function pressOperator() {
  // operates existing inputs if secondNumber is not empty
  if (secondNumber !== "") {operate()};

  // modifies operator variable with value from button press
  operator = this.value;
  // resets overwrite variable to continue allowing number input 
  overwrite = 0;

  updateDisplay("operator");
}

// clears one charcter on each button press, prioritize secondNumber > operator > firstNumber
function clear() {
  secondNumber !== "" ? secondNumber = clearLastChar(secondNumber):
  operator !== "" ? operator = "":
  firstNumber !== "" ? firstNumber = clearLastChar(firstNumber):
  console.log("clear() error");

  clearDisplay("clear");
}

// converts any primitive variable to string then delete last character
function clearLastChar(str) {
  return str.toString().slice(0, -1);
}

// resets variables to default values and clears display
function clearAll() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  overwrite = 0;
  clearDisplay("clearAll");
}

// operates existing inputs on equals button press, changes overwrite variable to allow calculator reset on next number button press
function pressEquals() {
  operate();
  overwrite = 1;
  updateDisplay("equals");
}

// changes number between positive/negative
function pressNegative() {
  secondNumber !== "" ? secondNumber = turnNegative(secondNumber):
  operator == "" ? firstNumber = turnNegative(firstNumber):
  console.log("pressNegative error");

  updateDisplay();
}

// takes input, converts to number type and mutiplies by -1
function turnNegative(num) {
  return Number(num) * -1;
}