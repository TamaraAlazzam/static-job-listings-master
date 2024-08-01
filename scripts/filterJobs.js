import { displayJobs } from "./displayJobs.js";
import { updateFilterIcons } from "./filterIcons.js";

let jobs = [];

export const filterCriteria = {
  role: [],
  level: [],
  languages: [],
  tools: [],
};

export function initializeFilters(fetchedJobs) {
  jobs = fetchedJobs;
  const resetButton = document.querySelector(".reset-button");
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      resetFilters();
      displayJobs(jobs);
    });
  }
}

export function applyFilters() {
  updateFilterIcons();

  const filteredJobs = jobs.filter((job) => {
    return (
      (filterCriteria.role.length === 0 ||
        filterCriteria.role.includes(job.role)) &&
      (filterCriteria.level.length === 0 ||
        filterCriteria.level.includes(job.level)) &&
      (filterCriteria.languages.length === 0 ||
        filterCriteria.languages.every((lang) =>
          job.languages.includes(lang)
        )) &&
      (filterCriteria.tools.length === 0 ||
        filterCriteria.tools.every((tool) => job.tools.includes(tool)))
    );
  });

  displayJobs(filteredJobs);
}

export function resetFilters() {
  Object.keys(filterCriteria).forEach((key) => {
    filterCriteria[key] = [];
  });
  applyFilters();
}
