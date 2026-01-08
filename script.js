let display = document.getElementById("display");
let expression = "";

// Append value safely
function appendValue(value) {
    const lastChar = expression.slice(-1);

    if ("+-*/".includes(lastChar) && "+-*/".includes(value)) return;

    expression += value;
    display.value = expression;
}

function clearDisplay() {
    expression = "";
    display.value = "";
}

// Calculate without eval
function calculate() {
    try {
        let result = Function('"use strict";return (' + expression + ')')();
        display.value = result;
        expression = result.toString();
    } catch {
        display.value = "Error";
        expression = "";
    }
}

// Keyboard support
document.addEventListener("keydown", function (e) {
    if ("0123456789+-*/".includes(e.key)) {
        appendValue(e.key);
    } else if (e.key === "Enter") {
        calculate();
    } else if (e.key === "Backspace") {
        expression = expression.slice(0, -1);
        display.value = expression;
    } else if (e.key === "Escape") {
        clearDisplay();
    }
});

// Dark / Light mode
function toggleTheme() {
    document.body.classList.toggle("light");
}
