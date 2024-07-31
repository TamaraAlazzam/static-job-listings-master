import { displayJobs } from "./displayJobs.js";
import { updateFilterIcons } from "./filterIcons.js";

let jobs = [];

export function initializeFilters(fetchedJobs) {
  jobs = fetchedJobs;

  const filters = document.querySelectorAll(".filter");
  filters.forEach((filter) => {
    filter.addEventListener("change", applyFilters);
  });
}

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

  updateFilterIcons(filterCriteria); // Update filter icons

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

export function resetFilters() {
  document.querySelectorAll('.filter[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });

  document.querySelectorAll('.filter[type="radio"]').forEach((radio) => {
    radio.checked = false;
  });

  document.querySelectorAll('input[value="Any"]').forEach((radio) => {
    radio.checked = true;
  });

  applyFilters(); // Reapply filters to update the display
}
