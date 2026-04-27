import evaluatePostfix from "./evaluatePostfix.js";

const precedence = new Map([
    ["-", 1],
    ["+", 1],
    ["*", 2],
    ["/", 2],
    ["%", 3],
    ["!", 4],
    ["^", 5],
    ["log", 6],
    ["ln", 6],
    ["abs", 6],
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
                return true;
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
        if (i >= str.length) break;
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
                if (drainStack(true) !== true) {
                    throw new SyntaxError("Enter Valid Parantheses pairs");
                }
                break;

            case "(":
                operators.push("(");
                break;

            default:
                if ("+-*^/%!".indexOf(str[i]) !== -1) {
                    operator = str[i];
                } else {
                    throw new SyntaxError("Enter valid characters only");
                }
                break;
        }

        while (
            operator != "" &&
            operators.length &&
            precedence.get(operators[operators.length - 1]) >=
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
}
