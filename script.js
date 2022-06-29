class Calculator {
    constructor(poButtons, coButtons) {
        this.poButtons = poButtons;
        this.coButtons = coButtons;
        this.clear();
    }

    clear() {
        this.co = '';
        this.po = '';
        this.operation = undefined;
    }

    delete() {
        this.co = this.co.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.co.includes('.')) return;
        this.co = this.co.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.co === '') return;
        if (this.po !== '') {
            this.compute();
        }
        this.operation = operation;
        this.po = this.co;
        this.co = '';
    }

    compute() {
        let computation 
        const prv = parseFloat(this.po);
        const crr = parseFloat(this.co);
        if (isNaN(prv) || isNaN(crr)) {
           return 
        }
        switch(this.operation) {
            case '+' : 
            computation = prv + crr;
            break
            case '-' : 
            computation = prv - crr;
            break
            case '*' : 
            computation = prv * crr;
            break
            case '/' : 
            computation = prv / crr;
            break
            default :
            return
        }
        this.co = computation;
        this.operation = undefined;
        this.po = '';
    }

    updateDisplay() {
        this.coButtons.innerText =this.co;
        this.poButtons.innerText =this.po;
        if (this.operation != null) {
            this.poButtons.innerText = `${this.po} ${this.operation}`
        }
        
    }
}




const numberButtons = document.querySelectorAll('[data-number]');
const oparatorButtons = document.querySelectorAll('[data-operation]');
const equalButtons = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const clearButtons = document.querySelector('[data-all-clear]');
const poButtons = document.querySelector('[data-po]');
const coButtons = document.querySelector('[data-co]');


const calculator = new Calculator(poButtons, coButtons);

numberButtons.forEach(button => {
button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
});
});


oparatorButtons.forEach(button => {
button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
});
});

equalButtons.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButtons.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButtons.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

