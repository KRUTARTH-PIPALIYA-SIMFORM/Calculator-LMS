import { displayString } from "../inputHandlers/index.js";

export default function addHistory(str = "") {
    let history = localStorage.getItem("calculation-history");
    history = history ? (JSON.parse(history)) : [];
    history.unshift([displayString, str]);
    localStorage.setItem("calculation-history", JSON.stringify(history));
    renderHistory();
}

export function renderHistory() {
    let history = localStorage.getItem("calculation-history");
    history = history ? JSON.parse(history) : [];

    let ul = document.querySelector(".history-list");
    ul.innerHTML = '';
    for (let i = 0; i < history.length; i++) {
        const li = document.createElement("li");
        li.className = "history-item";
        li.textContent = `${history[i][0]} = ${history[i][1]}`;
        ul.appendChild(li);
    }
}
