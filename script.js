class Calculator{
    constructor(preText, curText){
        this.preText = preText;
        this.curText = curText;
        this.clear();
    }
    clear(){
        this.curOperand = ``;
        this.preOperand = ``;
        this.operation = undefined;
    }
    delete(){
        this.curOperand = this.curOperand.toString().slice(0, -1);
    }
    appendNumber(number){
        if(number == '.' && this.curOperand.includes('.')) return;
        this.curOperand = this.curOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.curOperand == ``) return;
        if(this.preOperand != ``) this.compute();
        this.operation = operation;
        this.preOperand = this.curOperand;
        this.curOperand = ``;
    }
    compute(){
        let computation;
        const prev = parseFloat(this.preOperand);
        const curr = parseFloat(this.curOperand);
        if(isNaN(prev) || isNaN(curr)) return;
        switch(this.operation){
            case `+`:{
                computation = prev + curr;
                break;
            }
            case `-`:{
                computation = prev - curr;
                break;
            }
            case `*`:{
                computation = prev * curr;
                break;
            }
            case `/`:{
                computation = prev / curr;
                break;
            }
            default: return;
        }
        this.curOperand = computation;
        this.operation = undefined;
        this.preOperand = ``;
    }
    getDisplayNumber(number){
        const strNumber = number.toString();
        const intDigits = parseFloat(strNumber.split(`.`)[0]);
        const decimalDigits = strNumber.split(`.`)[1];
        let intDisplay = isNaN(intDigits) ? `` : intDigits.toLocaleString(`en`, {maximumFractionDigits: 0});
        return (decimalDigits != null) ? `${intDisplay}.${decimalDigits}` : intDisplay;
    }
    updateDisplay(){
        this.curText.innerText = this.getDisplayNumber(this.curOperand);
        const op = (this.operation != null) ? ` ${this.operation}` : ``;
        this.preText.innerText = `${this.getDisplayNumber(this.preOperand)} ${op}`;
    }
}

const numberButtons = document.querySelectorAll(`[data-number]`);
const operandButtons = document.querySelectorAll(`[data-operand]`);
const allClearButton = document.querySelector(`[data-all-clear]`);
const equalsButton = document.querySelector(`[data-equals]`);
const deleteButton = document.querySelector(`[data-delete]`);
const preText = document.querySelector(`[data-pre-operand]`);
const curText = document.querySelector(`[data-cur-operand]`);

const calculator = new Calculator(preText, curText);

numberButtons.forEach(button => {
    button.addEventListener(`click`, () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operandButtons.forEach(button => {
    button.addEventListener(`click`, () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener(`click`, () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener(`click`, () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener(`click`, () => {
    calculator.delete();
    calculator.updateDisplay();
});