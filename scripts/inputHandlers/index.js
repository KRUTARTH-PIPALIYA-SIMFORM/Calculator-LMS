import calculate from "../calculate.js";
import { renderHistory } from "../eventHandlers/addHistory.js";

export let displayString = "";

let inputTag = document.querySelector(".main-input-display > input");

renderHistory();

export function setDisplayValue(str = "") {
    displayString = str;
    renderDisplayValue();
}

export function appendDisplayValue(str = "") {
    setDisplayValue(displayString + str);
    renderDisplayValue();
}

export function deleteDisplayValue() {
    setDisplayValue(('' + displayString).slice(0, -1));
    renderDisplayValue();
}

export function clearDisplayValue() {
    setDisplayValue("");
    renderDisplayValue();
}

export function renderDisplayValue() {
    inputTag.value = displayString;
}

document.addEventListener("keydown", (e) => {
    displayString = inputTag.value;

    if (e.key === "Enter") {
        try {
            calculate(displayString);
        } catch (error) {
            alert(error.message);
            setDisplayValue(error.message);
        }
    }
});
