import { displayString } from "../inputHandlers/index.js";

export default function addHistory(str = "") {
    let history = localStorage.getItem("calculation-history");
    history = history ? new Array(JSON.parse(history)) : [];
    history.unshift([displayString, str]);
    localStorage.setItem("calculation-history", JSON.stringify(history));
    renderHistory();
}

export function renderHistory() {
    let history = localStorage.getItem("calculation-history");
    history = history ? new Array(JSON.parse(history)) : [];
    for (let i = 0; i < history.length; i++) {
        const li = document.createElement("li");
        li.className = "history-item";
        li.textContent = `${history[0][i][0]} = ${history[0][i][1]}`;
        document.querySelector(".history-list").appendChild(li);
    }
}
