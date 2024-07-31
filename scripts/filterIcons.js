import { applyFilters, resetFilters } from "./filterJobs.js";

export function updateFilterIcons(filterCriteria) {
  const iconTags = document.querySelector(".icon-tags");
  iconTags.innerHTML = "";

  let hasActiveFilters = false;

  filterCriteria.role.forEach((role) => {
    if (role !== "Any") {
      addFilterIcon(iconTags, role, "role");
      hasActiveFilters = true;
    }
  });

  filterCriteria.level.forEach((level) => {
    if (level !== "Any") {
      addFilterIcon(iconTags, level, "level");
      hasActiveFilters = true;
    }
  });

  filterCriteria.languages.forEach((language) => {
    addFilterIcon(iconTags, language, "languages");
    hasActiveFilters = true;
  });

  filterCriteria.tools.forEach((tool) => {
    addFilterIcon(iconTags, tool, "tools");
    hasActiveFilters = true;
  });

  if (hasActiveFilters) {
    addResetIcon(iconTags);
    iconTags.style.backgroundColor = "white";
  } else {
    iconTags.style.backgroundColor = "#f0fafb";
  }
}

function addFilterIcon(container, value, type) {
  const icon = document.createElement("div");
  icon.className = "filter-icon";
  icon.innerText = value;

  const removeButton = document.createElement("button");
  removeButton.className = "remove-icon";
  removeButton.innerText = "X";
  removeButton.addEventListener("click", () => {
    removeFilter(value, type);
  });

  icon.appendChild(removeButton);
  container.appendChild(icon);
}

function removeFilter(value, type) {
  const filters = document.querySelectorAll(
    `.filter[data-filter-type="${type}"]`
  );
  filters.forEach((filter) => {
    if (filter.value === value) {
      filter.checked = false;
    }
  });

  if (type === "role" || type === "level") {
    const anyFilter = document.querySelector(
      `.filter[data-filter-type="${type}"][value="Any"]`
    );
    if (anyFilter) {
      anyFilter.checked = true;
    }
  }

  applyFilters();
}

function addResetIcon(container) {
  const resetIcon = document.createElement("div");
  resetIcon.className = "filter-icon reset-icon";
  resetIcon.innerText = "Reset";

  resetIcon.addEventListener("click", () => {
    resetFilters();
  });

  container.appendChild(resetIcon);
}
