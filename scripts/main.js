import { fetchJobs } from "./fetchJobs.js";
import { displayJobs } from "./displayJobs.js";
import { resetFilters, initializeFilters } from "./filterJobs.js";

let jobs = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchJobs().then((data) => {
    jobs = data;
    displayJobs(jobs);
    initializeFilters(jobs);
  });

  const resetButton = document.querySelector('button[type="reset"]');
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      resetFilters();
      displayJobs(jobs);
    });
  }
});
