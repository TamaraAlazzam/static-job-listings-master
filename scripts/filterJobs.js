import { fetchJobs } from "./fetchJobs.js";
import { displayJobs } from "./displayJobs.js";

let jobs = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchJobs().then((data) => {
    jobs = data;
  });

  const filters = document.querySelectorAll(".filter");
  filters.forEach((filter) => {
    filter.addEventListener("change", applyFilters);
  });
});

export function applyFilters() {
  const filters = document.querySelectorAll(".filter:checked");
  const filterCriteria = {
    role: [],
    level: [],
    languages: [],
    tools: [],
  };

  filters.forEach((filter) => {
    const type = filter.getAttribute("data-filter-type");
    filterCriteria[type].push(filter.value);
  });

  const filteredJobs = jobs.filter((job) => {
    const roleMatch =
      filterCriteria.role.length === 0 ||
      filterCriteria.role.includes(job.role) ||
      filterCriteria.role.includes("Any");

    const levelMatch =
      filterCriteria.level.length === 0 ||
      filterCriteria.level.includes(job.level) ||
      filterCriteria.level.includes("Any");

    const languagesMatch =
      filterCriteria.languages.length === 0 ||
      filterCriteria.languages.every((lang) => job.languages.includes(lang));

    const toolsMatch =
      filterCriteria.tools.length === 0 ||
      filterCriteria.tools.every((tool) => job.tools.includes(tool));

    return roleMatch && levelMatch && languagesMatch && toolsMatch;
  });

  displayJobs(filteredJobs);
}
