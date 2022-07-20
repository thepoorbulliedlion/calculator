//num as string
let numS = [];
let total = 0;

//num as not a string
let numN = [];
let numN2 = [];

let digitedNum = [];

let timesDivideIndex = [];
let additionSubtractionIndex = [];
//get buttons
var button = document.querySelectorAll("[data-button]");

//convert string into integers
function convert() {
  digitedNum.forEach((number) => {
    if (number === "+" || number === "-" || number === "*" || number === "÷") {
      numN.push(number);
    } else {
      let conToNum = parseFloat(number);
      numN.push(conToNum);
    }
  });
}

function convert2() {
  numN.forEach((number) => {
    if (number === "+" || number === "-" || number === "*" || number === "÷") {
      numN2.push(number);
    } else {
      let conToNum = parseFloat(number);
      numN2.push(conToNum);
    }
  });
}

//combine multiple numbers in an array
function combine() {
  let number = "";

  numS.forEach((item) => {
    if (item == "+" || item == "-" || item == "*" || item == "÷") {
      digitedNum.push(number);
      digitedNum.push(item);
      number = "";
    } else {
      number += item;
    }
  });

  digitedNum.push(number);
}

//multiplication and division
getTimesDivideIndex = () => {
  numN.forEach((item, index) => {
    if (item == "*" || item == "÷") {
      timesDivideIndex.push(index);
    }
  });
};

timesDivideCalc = () => {
  let value = 0;
  let idx = timesDivideIndex[0];
  const b = idx - 1;
  const a = idx + 1;

  numN.forEach((item, index) => {
    const before = numN[b];
    const after = numN[a];

    if (numN[idx] == "*") {
      value = before * after;
      numN.splice(b, 3, value);
    } else if (numN[idx] == "÷") {
      value = before / after;
      numN.splice(b, 3, value);
    }
  });
};

td = () => {
  for (var i = 0; i < digitedNum.length / 2 - 0.5; i++) {
    getTimesDivideIndex();
    timesDivideCalc();
  }
};

//addition and subtraction
getAddSubIndex = () => {
  numN.forEach((item, index) => {
    if (item == "+" || item == "-") {
      additionSubtractionIndex.push(index);
    }
  });
};

addSubCalc = () => {
  let idx = additionSubtractionIndex[0];
  const b = idx - 1;
  const a = idx + 1;

  numN.forEach((item, index) => {
    const before = numN[b];
    const after = numN[a];

    if (numN[idx] == "+") {
      total = before + after;
      numN.splice(b, 3, total);
    } else if (numN[idx] == "-") {
      total = before - after;
      numN.splice(b, 3, total);
    }
  });
};

aS = () => {
  for (var i = 0; i < digitedNum.length / 2 - 0.5; i++) {
    getAddSubIndex();
    addSubCalc();
  }
};

//equal button runs these functions
action = () => {
  combine();
  convert();
  td();
  convert2();
  aS();
  total = numN[0];
  total.toString();
  display.innerText = total;
};

//equal button does something
var equal = document.getElementById("=");
equal.addEventListener("click", action);

//push key pressed into num
button.forEach((button) => {
  button.addEventListener("click", () => {
    display.append(button.innerText);
    numS.push(button.innerText);
  });
});

//clear
document.body.addEventListener("keydown", () => {
  display.innerHTML = "";
  numS = [];
  numN = [];
  digitedNum = [];
  timesDivideIndex = [];
  additionSubtractionIndex = [];
});
