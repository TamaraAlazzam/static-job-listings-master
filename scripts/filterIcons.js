import { applyFilters, resetFilters, filterCriteria } from "./filterJobs.js";

export function updateFilterIcons() {
  const iconTags = document.querySelector(".icon-tags");
  iconTags.innerHTML = "";

  let hasActiveFilters = false;

  Object.keys(filterCriteria).forEach((type) => {
    filterCriteria[type].forEach((value) => {
      addFilterIcon(iconTags, value, type);
      hasActiveFilters = true;
    });
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
  const index = filterCriteria[type].indexOf(value);
  if (index !== -1) {
    filterCriteria[type].splice(index, 1);
    applyFilters();
  }
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
