import { displayString } from "../inputHandlers/index.js";

let history = localStorage.getItem('calculation-history');
history = history ? new Array(JSON.parse(history)) : [];

export default function addHistory(str = "") {
    history.unshift([displayString, str]);
    const li = document.createElement("li");
    li.className = "history-item";
    li.textContent = `${displayString} = ${str}`;
    document.querySelector(".history-list").prepend(li);
    localStorage.setItem('calculation-history', JSON.stringify(history));
}
