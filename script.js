function Calculator(){
    this.operation = {
        "+": (a,b) => a + b,
        "-": (a,b) => a - b,
        "*": (a,b) => a * b,
        "/": (a,b) => a / b,
    }
    this.calculate = function(a, op, b){
        return this.operation[op](parseInt(a),parseInt(b));
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
            button.addEventListener("click", () => {
                const btnAction = button.getAttribute("id");
                if (btnAction === "="){
                    console.log(display.textContent);
                    display.textContent = calc.operate(display.textContent);
                }
                else if (btnAction !== "del" && btnAction !== "clear"){
                    if (isNaN(btnAction)){
                        display.textContent += " " + btnAction + " ";
                    }
                    else{
                        display.textContent += btnAction;
                    }
                }
            });
            row.appendChild(button);
        }
        buttonsContainer.appendChild(row);
    }
}
const btnMatrix = [
    ["clear", "x", "del", "=" ],
    ["7", "8", "9", "/" ],
    ["4", "5", "6", "*" ],
    ["1", "2", "3", "-" ],
    ["x", "0", "x", "+" ]
]
const calc = new Calculator();
const buttonsContainer = document.querySelector(".buttons-cont");
const display = document.querySelector(".display");
addButtons();
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () =>{
    display.textContent = "";
})
const delButton = document.querySelector("#del");
delButton.addEventListener("click", () =>{
    display.textContent = display.textContent.slice(0, -1);
})

