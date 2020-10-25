// variables for input storage as string types, firstNumber used as "total" counter
let firstNumber = "";
let secondNumber = "";
let operator = "";

// allows next number button press to reset calculator to zero
// true when equals button pressed
// false when any operator pressed (indicating continuation of current calculations) or clearAll pressed (to reset calculator to default state)
let overwrite = false;

// calculator display textContent = "0" when all input variables empty
function updateDisplay() {
  const calcDisplay = document.querySelector(".calc__displaytext");
  if (`${firstNumber}${operator}${secondNumber}` === "") {
    calcDisplay.textContent = "0";
  } else {
  calcDisplay.textContent = `${firstNumber}${operator}${secondNumber}`
  };
}

// takes 3 inputs and calculates total, then resets variables for subsequent inputs. converts string inputs to numbers before calculation
function operate() {
  operator === "+" ? firstNumber = Number(firstNumber) + Number(secondNumber):
  operator === "-" ? firstNumber = Number(firstNumber) - Number(secondNumber):
  operator === "*" ? firstNumber = Number(firstNumber) * Number(secondNumber):
  operator === "/" ? firstNumber = Number(firstNumber) / Number(secondNumber):
  operator === "^" ? firstNumber = Number(firstNumber) ** Number(secondNumber):
  console.log("operate() error");

  firstNumber = formatDecimalPlaces(firstNumber);
  secondNumber = "";
  operator = "";
}

// function used by each number button, adds each button press as a string
function pressNum(num) {
  // allows number button press to reset calculator
  if (overwrite) {clearAll()};

  // if no operator pressed edit first number, else edit second number
  operator === "" ? firstNumber += numCheck(num, firstNumber):
  secondNumber += numCheck(num, secondNumber);

  updateDisplay();
}

// prevents multiple decimal entry, returns "0." for "." inputs into empty string
function numCheck(newNum, oldNum) {
  if (newNum === "." && oldNum.includes(".")) {
    console.log("existing decimal detected");
    return "";
  } else if (newNum === "." && oldNum === "") {
    return "0.";
  } else {
    return newNum;
  }
}

// function used by each operator
function pressOperator(op) {
  // operates existing inputs if secondNumber is not empty
  if (secondNumber !== "") {operate()};

  // modifies operator variable with value from button press
  operator = op;
  // resets overwrite variable to continue allowing number input 
  overwrite = false;

  updateDisplay();
}

// clears one charcter on each button press, prioritize secondNumber > operator > firstNumber
function clear() {
  secondNumber !== "" ? secondNumber = clearLastChar(secondNumber):
  operator !== "" ? operator = "":
  firstNumber !== "" ? firstNumber = clearLastChar(firstNumber):
  console.log("clear() error");

  updateDisplay();
}

// converts any primitive variable to string then delete last character
function clearLastChar(str) {
  return str.slice(0, -1);
}

// resets variables to default values and clears display
function clearAll() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  overwrite = false;

  updateDisplay();
}

// operates existing inputs on equals button press, changes overwrite variable to allow calculator reset on next number button press
function pressEquals() {
  operate();
  overwrite = true;
  updateDisplay();
}

// changes number between positive/negative
function pressNegative() {
  secondNumber !== "" ? secondNumber = convertNegative(secondNumber):
  operator === "" ? firstNumber = convertNegative(firstNumber):
  console.log("pressNegative error");

  updateDisplay();
}

// takes input, converts to number type and mutiplies by -1
function convertNegative(num) {
  return Number(num) * -1;
}

// rounds to 7 decimal places and deletes excess zeroes
function formatDecimalPlaces(num) {
  if (num.toString().includes(".")) {
    let array = num.toFixed(7).toString().split(".");

    while (array[1].charAt(array[1].length - 1) === "0") {
      array[1] = array[1].slice(0, -1);
    };

    return Number(array.join("."));
  } else {
    return num;
  }
}