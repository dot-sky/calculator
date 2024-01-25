function Calculator() {
    this.operation = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => {
            if (b !== 0) {
                return Math.floor((a/b) * 10000) / 10000;
            }
            else {
                this.throwError();
                return "error";
            }
        },
    }
    this.calculate = function (a, op, b) {
        return this.operation[op](parseFloat(a), parseFloat(b));
    };
    this.operate = function (str) {
        const op = str.split(" ");
        if (op.length !== 3) {
            return op[0];
        }
        return this.calculate(...op)
    };
    this.throwError = function () {
        displayCont.style.backgroundColor = RED;
        errorRaised = true;
    };
}
function addButtons() {
    for (let i = 0; i < BTN_MATRIX.length; i++) {
        const row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < BTN_MATRIX[i].length; j++) {
            const button = document.createElement("div");
            button.className = "button";
            button.setAttribute("id", BTN_MATRIX[i][j]);
            button.textContent = BTN_MATRIX[i][j];
            addButtonEvents(button);
            row.appendChild(button);
        }
        buttonsContainer.appendChild(row);
    }
}
function doCalculation() {
    lastOp.textContent = display.textContent + " =";
    display.textContent = calc.operate(display.textContent);
}
function clearCalc() {
    display.textContent = "";
    lastOp.textContent = " ";
    lastAction = "+";
    opCounter = 0;
    if (errorRaised) {
        displayCont.style.backgroundColor = GREEN;
        errorRaised = false;
    }
}
function addButtonEvents(button) {
    button.addEventListener("click", () => {
        let btnAction = button.getAttribute("id");
        console.log(lastAction + " " + btnAction);
        if (btnAction === "clear" || errorRaised) {
            clearCalc();
        }
        else if (btnAction === "del") {
            if (display.textContent.at(-1) === " ") {
                display.textContent = display.textContent.slice(0, -3);
                opCounter--;
            }
            else {
                display.textContent = display.textContent.slice(0, -1);
            }
        }
        else if (!isNaN(btnAction) || btnAction === ".") {
            display.textContent += btnAction;
        }
        else if (btnAction === "(-)"){
            if (display.textContent.length === 0 || display.textContent.at(-1) === " ")
                display.textContent += "-";
            else{
                console.log("here")
                btnAction = lastAction
            }
        }
        else if (btnAction === "=" && !isNaN(lastAction)) {
            doCalculation();
            opCounter = 0;
        }
        else if (isNaN(lastAction) && !SPECIAL_KEYS.includes(lastAction)) {
            return;
        }
        else if (opCounter > 0 && btnAction !== "=") {
            doCalculation();
            display.textContent += " " + btnAction + " ";
            opCounter = 1;
        }
        else if (display.textContent !== "") {
            display.textContent += " " + btnAction + " ";
            opCounter++;
        }
        lastAction = btnAction;
    });
}
const RED = "#d48383";
const GREEN = "#9FBBB3";
const SPECIAL_KEYS = ["clear", "=", "del"];
const BTN_MATRIX = [
    ["clear", "del", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["(-)", "0", ".", "="]
];
const buttonsContainer = document.querySelector(".buttons-cont");
const display = document.querySelector(".display");
const displayCont = document.querySelector(".display-cont");
const lastOp = document.querySelector(".last-op");
const cont = document.querySelector(".container");

const calc = new Calculator();
let errorRaised = false;
let opCounter = 0;
let lastAction = "+";
addButtons();
const clear = document.querySelector ("#clear");
clear.classList.add("larger");

