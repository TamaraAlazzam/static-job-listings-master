import { fetchAndProcessJobData } from "./job-data-fetcher.js";
import { setupEventListeners } from "./job-event-handlers.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchAndProcessJobData().then((jobController) => {
    if (jobController) {
      setupEventListeners(jobController);
    }
  }).catch((error) => {
    console.error("Error initializing application:", error);
  });
});