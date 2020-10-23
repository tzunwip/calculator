const keypadArray = [
  {name: "clearAll", text: "AC", onclick: clearAll},
  {name: "clear", text: "C", onclick: clear},
  {name: "power", text: "^", onclick: pressOperator},
  {name: "divide", text: "/", onclick: pressOperator},
  {name: "seven", text: "7", onclick: pressNum},
  {name: "eight", text: "8", onclick: pressNum},
  {name: "nine", text: "9", onclick: pressNum},
  {name: "multiply", text: "*", onclick: pressOperator},
  {name: "four", text: "4", onclick: pressNum},
  {name: "five", text: "5", onclick: pressNum},
  {name: "six", text: "6", onclick: pressNum},
  {name: "subtract", text: "-", onclick: pressOperator},
  {name: "one", text: "1", onclick: pressNum},
  {name: "two", text: "2", onclick: pressNum},
  {name: "three", text: "3", onclick: pressNum},
  {name: "add", text: "+", onclick: pressOperator},
  {name: "negative", text: "-/+", onclick: pressNegative},
  {name: "zero", text: "0", onclick: pressNum},
  {name: "decimal", text: ".", onclick: pressNum},
  {name: "equals", text: "=", onclick: pressEquals},
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
    btn.onclick = cur.onclick;

    //console.log(`cur:${cur.name}, index:${index}`)

    keypadDiv.appendChild(btn);
  });
  calcFrame.appendChild(keypadDiv);

  const body = document.querySelector("body");
  body.appendChild(calcFrame);
}

generateCalc();