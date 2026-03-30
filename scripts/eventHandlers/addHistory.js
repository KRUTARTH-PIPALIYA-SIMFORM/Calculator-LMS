import { displayString } from "../inputHandlers/index.js";

const history = [];

export default function addHistory(str = '') {
    history.push([displayString, str]);
} 