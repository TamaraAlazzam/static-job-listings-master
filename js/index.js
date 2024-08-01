import { app } from "./app.js";

document.addEventListener("DOMContentLoaded", app.setCards());

document.getElementById("clear-filter").addEventListener("click", () => {
    app.clearFilter();
});