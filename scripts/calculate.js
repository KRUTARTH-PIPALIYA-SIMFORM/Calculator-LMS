import addHistory from "./eventHandlers/addHistory.js";
import { setDisplayValue } from "./inputHandlers/index.js";

const precedence = new Map([
    ["-", 1],
    ["+", 2],
    ["*", 3],
    ["/", 4],
    ["%", 5],
    ["!", 6],
    ["^", 7],
    ["log", 8],
    ["ln", 9],
    ["abs", 10],
    ["(", 0],
    [")", -1],
]);

export default function calculate(str = "") {
    let operators = [],
        operands = [];
    let operand = "";

    const drainStack = (bracketFlag = false) => {
        while (operators.length) {
            if (bracketFlag && operators[operators.length - 1] === "(") {
                operators.pop();
                break;
            }
            operands.push(operators.pop());
        }
    };

    for (let i = 0; i < str.length; i++) {
        while (
            (str.length > i &&
                str.charCodeAt(i) >= "0".charCodeAt(0) &&
                str.charCodeAt(i) <= "9".charCodeAt(0)) ||
            str[i] === "."
        ) {
            operand += str[i];
            i++;
        }

        if (operand != "") {
            operands.push(+operand);
            operand = "";
        }

        let operator = "";

        switch (str[i]) {
            case "l":
                if (str.slice(i, i + 3) === "log") {
                    operator = "log";
                    i += 2;
                } else if (str.slice(i, i + 2) === "ln") {
                    operator = "ln";
                    i += 1;
                }
                break;

            case "a":
                if (str.slice(i, i + 3) === "abs") {
                    operator = "abs";
                    i += 2;
                }
                break;

            case "s":
                if (str.slice(i, i + 4) === "sqrt") {
                    operator = "sqrt";
                    i += 3;
                    break;
                }
                break;

            case ")":
                drainStack(true);
                break;

            case "(":
                operators.push("(");
                break;

            default:
                operator = str[i];
                break;
        }

        while (
            operator != "" &&
            operators.length &&
            precedence.get(operators[operators.length - 1]) >
                precedence.get(operator)
        ) {
            operands.push(operators.pop());
        }

        if (operator) {
            operators.push(operator);
        }
    }
    if (operand != "") {
        operands.push(+operand);
        operand = "";
    }
    drainStack();
    evaluatePostfix(operands);
    console.log(operands, operators, operand);
}

function evaluatePostfix(array = []) {
    const addition = () => result.push(result.pop() + result.pop());

    const multiplication = () => result.push(result.pop() * result.pop());

    const log = () => result.push(Math.log(result.pop()));

    const ln = () => result.push(Math.ln(result.pop()));

    const sqrt = () => result.push(Math.sqrt(result.pop()));

    const abs = () => result.push(Math.abs(result.pop()));

    const subtraction = () => {
        let o2 = result.pop();
        let o1 = result.pop() ?? 0;
        result.push(o1 - o2);
    };

    const division = () => {
        let o2 = result.pop();
        let o1 = result.pop();
        result.push(o1 / o2);
    };

    const mod = () => {
        let o2 = result.pop();
        let o1 = result.pop();
        result.push(o1 % o2);
    };

    const order = () => {
        let o2 = result.pop();
        let o1 = result.pop() ?? 0;
        result.push(o1 ** o2);
    };

    let result = [];
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] !== "number") {
            switch (array[i]) {
                case "+":
                    addition();
                    break;

                case "-":
                    subtraction();
                    break;

                case "*":
                    multiplication();
                    break;

                case "/":
                    division();
                    break;

                case "%":
                    mod();
                    break;

                case "^":
                    order();
                    break;

                case "log":
                    log();
                    break;

                case "ln":
                    ln();
                    break;

                case "sqrt":
                    sqrt();
                    break;

                case "abs":
                    abs();
                    break;
            }
        } else {
            result.push(array[i]);
        }
    }

    addHistory(result[0]);
    setDisplayValue(result[0]);
}
