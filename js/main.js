const keypadArray = [
  {name: "clearAll", text: "AC", btnAction: clearAll},
  {name: "clear", text: "C", btnAction: clear},
  {name: "power", text: "^", btnAction: pressOperator},
  {name: "divide", text: "/", btnAction: pressOperator},
  {name: "seven", text: "7", btnAction: pressNum},
  {name: "eight", text: "8", btnAction: pressNum},
  {name: "nine", text: "9", btnAction: pressNum},
  {name: "multiply", text: "*", btnAction: pressOperator},
  {name: "four", text: "4", btnAction: pressNum},
  {name: "five", text: "5", btnAction: pressNum},
  {name: "six", text: "6", btnAction: pressNum},
  {name: "subtract", text: "-", btnAction: pressOperator},
  {name: "one", text: "1", btnAction: pressNum},
  {name: "two", text: "2", btnAction: pressNum},
  {name: "three", text: "3", btnAction: pressNum},
  {name: "add", text: "+", btnAction: pressOperator},
  {name: "negative", text: "-/+", btnAction: pressNegative},
  {name: "zero", text: "0", btnAction: pressNum},
  {name: "decimal", text: ".", btnAction: pressNum},
  {name: "equals", text: "=", btnAction: pressEquals},
];

const keypadColumns = 4;
const keypadRows = 5;

function generateCalc() {
  const calcFrame = document.createElement("div");
  calcFrame.classList.add("calc__frame");

  const calcDisplay = document.createElement("div");
  calcDisplay.classList.add("calc__display");
  const calcDisplayText = document.createElement("p");
  calcDisplayText.classList.add("calc__displaytext");
  calcDisplayText.textContent = "0";
  calcDisplay.appendChild(calcDisplayText);
  calcFrame.appendChild(calcDisplay);

  const keypadDiv = document.createElement("div");
  keypadDiv.className = "calc__keypad";
  keypadDiv.style.gridTemplate = `repeat(${keypadRows}, 1fr)/repeat(${keypadColumns}, 1fr)`;

  keypadArray.forEach((cur, index) => {
    const btn = document.createElement("button");

    const column = index % keypadColumns;
    const row = Math.floor((index / keypadArray.length) * keypadRows);

    btn.className = `calc__btn calc__column${column} calc__row${row}`;
    btn.id = `btn__${cur.name}`;
    btn.textContent = cur.text;
    btn.value = cur.text;
    btn.addEventListener("click", event => {
      cur.btnAction(event.target.value);
    })

    keypadDiv.appendChild(btn);
  });
  calcFrame.appendChild(keypadDiv);

  const body = document.querySelector("body");
  body.appendChild(calcFrame);
}

// keyboard support
document.addEventListener("keydown", function(event) {
  let input = event.key;

  switch (input) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
      pressNum(input);
      break;
    case "^":
    case "/":
    case "*":
    case "+":
    case "-":
      pressOperator(input);
      break;
    case "=":
    case "Enter":
      pressEquals();
      break;
    case "Backspace":
      clear();
      break;
    case "Escape":
      clearAll();
      break;
  }
})

generateCalc();