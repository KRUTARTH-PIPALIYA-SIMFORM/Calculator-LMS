import buttonClick from "./eventHandlers/buttonClick.js";
import toggleHistory from "./eventHandlers/toggleHistory.js";

const btn = document.querySelector(".main-header-hamburger");
btn.addEventListener("click", toggleHistory);

const operations = document.querySelector(".buttons-grid-wrapper");
operations.addEventListener("click", buttonClick);
