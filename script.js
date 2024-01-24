function Calculator(){
    this.operation = {
        "+": (a,b) => a + b,
        "-": (a,b) => a - b,
        "*": (a,b) => a * b,
        "/": (a,b) => a / b,
    }
    this.calculate = function(a, op, b){
        return this.operation[op](parseFloat(a),parseFloat(b));
    };
    this.operate = function(str){
        const op = str.split(" ");
        return this.calculate(...op)
    }
}
function addButtons(){
    for (let i = 0; i < 5; i++) {
        const row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < 4; j++) {
            const button = document.createElement("div");
            button.className = "button";
            button.setAttribute("id",btnMatrix[i][j]);
            button.textContent = btnMatrix[i][j];
            addButtonEvents(button);
            row.appendChild(button);
        }
        buttonsContainer.appendChild(row);
    }
}
function doCalculation(){
    lastOp.textContent = display.textContent+" =";
    display.textContent = calc.operate(display.textContent);
}
function addButtonEvents(button){
    button.addEventListener("click", () => {
        const btnAction = button.getAttribute("id");
        if (btnAction === "clear"){
            display.textContent = "";
            opCounter = 0;
            lastOp.textContent = " "; 
        }
        else if (btnAction === "del" ){
            if (display.textContent.at(-1)===" "){
                display.textContent = display.textContent.slice(0, -3); 
            }
            else{
                display.textContent = display.textContent.slice(0, -1); 
            }
        }
        else if (!isNaN(btnAction)){
            display.textContent += btnAction;
        }
        else if(btnAction === "="){
            doCalculation();
            opCounter = 0;
        }
        else if(opCounter > 0){
            doCalculation();
            display.textContent += " " + btnAction + " ";
            opCounter = 1;
        }
        else{
            display.textContent += " " + btnAction + " ";
            opCounter++;
        }
    });
}
const btnMatrix = [
    ["clear", "x", "del", "=" ],
    ["7", "8", "9", "/" ],
    ["4", "5", "6", "*" ],
    ["1", "2", "3", "-" ],
    ["-", "0", ".", "+" ]
]
const calc = new Calculator();
let opCounter = 0;
const buttonsContainer = document.querySelector(".buttons-cont");
const display = document.querySelector(".display");
const lastOp = document.querySelector(".last-op");
addButtons();
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () =>{
    display.textContent = "";
    opCounter = 0;
    lastOp.textContent = " "; 
})
const delButton = document.querySelector("#del");
delButton.addEventListener("click", () =>{
    
})

 