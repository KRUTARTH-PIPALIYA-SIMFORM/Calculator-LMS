import { displayString } from "../inputHandlers/index.js";

const history = [];

export default function addHistory(str = "") {
    history.unshift([displayString, str]);
    const li = document.createElement("li");
    li.className = "history-item";
    li.textContent = `${displayString} = ${str}`;
    document.querySelector(".history-list").prepend(li);
}
