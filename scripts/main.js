import { fetchJobs } from "./fetchJobs.js";
import { displayJobs } from "./displayJobs.js";
import { initializeFilters } from "./filterJobs.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchJobs().then((jobs) => {
    displayJobs(jobs);
    initializeFilters(jobs);
  });
});
