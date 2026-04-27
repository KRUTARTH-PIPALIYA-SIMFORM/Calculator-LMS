import addHistory from "./eventHandlers/addHistory.js";
import factorial from "./factorial.js";
import { setDisplayValue } from "./inputHandlers/index.js";

export default function evaluatePostfix(array = []) {
    const addition = () => result.push(result.pop() + result.pop());

    const multiplication = () => result.push(result.pop() * result.pop());

    const log = () => result.push(Math.log10(result.pop()));

    const ln = () => result.push(Math.log(result.pop()));

    const sqrt = () => result.push(Math.sqrt(result.pop()));

    const abs = () => result.push(Math.abs(result.pop()));

    const fact = () => result.push(factorial(result.pop()));

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

                case "!":
                    fact();
                    break;
                
                default:
                    throw new SyntaxError("Add valid characters");
            }
        } else {
            result.push(array[i]);
        }
    }

    if (
        result.length !== 1 ||
        typeof result[0] !== "number" ||
        isNaN(result[0])
    ) {
        throw new SyntaxError("Enter Valid expression");
    }

    addHistory(result[0]);
    setDisplayValue(result[0]);
}
