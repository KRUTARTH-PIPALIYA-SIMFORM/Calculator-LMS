export let displayString = "";

let inputTag = document.querySelector(".main-input-display > input");

export function setDisplayValue(str = "") {
    displayString = str;
    renderDisplayValue();
}

export function appendDisplayValue(str = "") {
    setDisplayValue(displayString + str);
    renderDisplayValue();
}

export function deleteDisplayValue() {
    setDisplayValue(displayString.slice(0, -1));
    renderDisplayValue();
}

export function clearDisplayValue() {
    setDisplayValue("");
    renderDisplayValue();
}

export function renderDisplayValue() {
    inputTag.value = displayString;
}
