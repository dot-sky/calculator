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
const calc = new Calculator();
