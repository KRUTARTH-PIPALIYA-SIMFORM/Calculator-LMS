import calculate from "../calculate.js";
import {
    appendDisplayValue,
    clearDisplayValue,
    deleteDisplayValue,
    displayString,
} from "../inputHandlers/index.js";

export default function buttonClick(e) {
    const value = e.target.getAttribute("appendable");
    if (e.target.classList[0] === "operations-button") {
        switch (value) {
            case "CLEAR":
                clearDisplayValue();
                break;

            case "DELETE":
                deleteDisplayValue();
                break;

            case "CALCULATE":
                calculate(displayString);
                break;

            default:
                appendDisplayValue(value);
                break;
        }
    }
}
