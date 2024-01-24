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
            row.appendChild(button);
        }
        buttonsContainer.appendChild(row);
    }
}
const btnMatrix = [
    ["clear", "X", "del", "=" ],
    ["7", "8", "9", "/" ],
    ["4", "5", "6", "*" ],
    ["1", "2", "3", "-" ],
    ["x", "0", "x", "+" ]
]
const calc = new Calculator();
const buttonsContainer = document.querySelector(".buttons-cont");
addButtons();