import { applyFilters, resetFilters, filterCriteria } from "./filterJobs.js";

const resetIcon = createResetIcon();
export function updateFilterIcons() {
  const iconTags = document.querySelector(".icon-tags");
  iconTags.innerHTML = "";

  let hasActiveFilters = false;

  Object.entries(filterCriteria).forEach(([type, values]) => {
    values.forEach((value) => {
      const icon = createIcon(value, type);
      iconTags.appendChild(icon);
      hasActiveFilters = true;
    });
  });

  if (hasActiveFilters) {
    iconTags.appendChild(resetIcon);
    iconTags.style.backgroundColor = "white";
    iconTags.style.boxShadow = "0 8px 8px rgba(0, 0, 0, 0.1)";
  } else {
    iconTags.style.backgroundColor = "transparent";
    iconTags.style.boxShadow = "";
  }
}

function createIcon(value, type) {
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
  return icon;
}

function removeFilter(value, type) {
  const index = filterCriteria[type].indexOf(value);
  if (index !== -1) {
    filterCriteria[type].splice(index, 1);
    applyFilters();
  }
}

function createResetIcon() {
  const resetContainer = document.createElement("div");
  resetContainer.className = "reset-container";

  const resetIcon = document.createElement("div");
  resetIcon.className = "reset-button";
  resetIcon.innerText = "Clear";
  resetIcon.addEventListener("click", resetFilters);

  resetContainer.appendChild(resetIcon);
  return resetContainer;
}
