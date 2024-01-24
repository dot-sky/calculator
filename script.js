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
            button.addEventListener("click", () => {
                const btnAction = button.getAttribute("id");
                if (btnAction === "del" || btnAction === "clear"){
                    return;
                }
                if (!isNaN(btnAction)){
                    display.textContent += btnAction;
                }
                else if(btnAction === "="){
                    display.textContent = calc.operate(display.textContent);
                    opCounter = 0;
                }
                else if(opCounter > 0){
                    display.textContent = calc.operate(display.textContent) + " " + btnAction + " ";
                    opCounter = 1;
                }
                else{
                    display.textContent += " " + btnAction + " ";
                    opCounter++;
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
let opCounter = 0;
const buttonsContainer = document.querySelector(".buttons-cont");
const display = document.querySelector(".display");
addButtons();
const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () =>{
    display.textContent = "";
    opCounter = 0;
})
const delButton = document.querySelector("#del");
delButton.addEventListener("click", () =>{
    if (display.textContent.at(-1)===" ")
        display.textContent = display.textContent.slice(0, -3); 
    else
        display.textContent = display.textContent.slice(0, -1); 
})

 
// if (btnAction !== "del" && btnAction !== "clear"){
//     if (isNaN(btnAction)){
//         display.textContent += " " + btnAction + " ";
//         opCounter++;
//         console.log("enters")
//     }
//     else{
//         display.textContent += btnAction;
//     }
// }
// if (btnAction === "=" || opCounter > 1){
//     display.textContent = calc.operate(display.textContent) + " " + btnAction + " ";
//     console.log(display.textContent);
//     if (btnAction === "=" ){
//         opCounter = 0;
//     }
//     else{
//         opCounter = 1;
//     }
// }