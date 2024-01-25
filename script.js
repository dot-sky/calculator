function Calculator() {
    this.operation = {
        "+": (a, b) => this.Round(a + b),
        "-": (a, b) => this.Round(a - b),
        "*": (a, b) => this.Round(a * b),
        "/": (a, b) => {
            if (b !== 0) {
                return this.Round(a,b);
            }
            else {
                this.throwError();
                return "error";
            }
        },
    }
    this.Round = function(num){
        return Math.floor(num * 10000) / 10000;
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
            button.className = "button flex-center";
            if (i== 0 || j+1 == BTN_MATRIX[i].length){
                button.classList.add("accent");
            }
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
    const result = calc.operate(display.textContent)
    display.textContent = result;
    if (Math.floor(result) === result){
        dotActive = false;
    }
}
function clearCalc() {
    display.textContent = "";
    lastOp.textContent = " ";
    lastAction = "+";
    opCounter = 0;
    dotActive = false;
    if (errorRaised) {
        displayCont.style.backgroundColor = GREEN;
        errorRaised = false;
    }
}
function addButtonEvents(button) {
    button.addEventListener("click", () => {
        let btnAction = button.getAttribute("id");
        if (btnAction === "clear" || errorRaised) {
            clearCalc();
        }
        else if (btnAction === "del") {
            if (display.textContent.at(-1) === " ") {
                display.textContent = display.textContent.slice(0, -3);
                opCounter--;
                dotActive = false;
            }
            else {
                if (display.textContent.at(-1) === "."){
                    dotActive = false;
                }
                display.textContent = display.textContent.slice(0, -1);
            }
        }
        else if (!isNaN(btnAction) ) {
            display.textContent += btnAction;
        }
        else if(btnAction === "." ){
            if (!dotActive){
                display.textContent += btnAction;
                dotActive = true;
            }
            else{
                btnAction = lastAction;
            }
        }
        else if (btnAction === "(-)") {
            if (display.textContent.length === 0 || display.textContent.at(-1) === " "){
                display.textContent += "-";
            }
            else {
                btnAction = lastAction;
            }
        }
        else if (btnAction === "=" && !isNaN(lastAction)) {
            doCalculation();
            opCounter = 0;
        }
        else if (isNaN(lastAction) && !SPECIAL_KEYS.includes(lastAction)) {
            return;
        }
        else if (opCounter > 0 && btnAction !== "=" ) {
            doCalculation();
            console.log("this");
            display.textContent += " " + btnAction + " ";
            opCounter = 1;
        }
        else if (display.textContent !== "") {
            display.textContent += " " + btnAction + " ";
            dotActive = false;
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
let dotActive = false;
let lastAction = "+";
addButtons();
const clear = document.querySelector("#clear");
clear.classList.add("larger");

