export function updateClearButton(selectedFilters) {
  const clearButton = document.getElementById("clearFilters");
  if (selectedFilters.length > 0) {
    clearButton.style.display = "block";
  } else {
    clearButton.style.display = "none";
  }
}

export function clearFilters(selectedFilters, jobs, jobsQuery) {
  selectedFilters.length = 0; // Reset the selectedFilters array

  // Deselect all tags
  document
    .querySelectorAll(".availableTag")
    .forEach((tag) => tag.classList.remove("active"));

  // Show the initial job listings again
  jobsQuery(jobs);
  updateClearButton(selectedFilters); // Hide the "Clear" button since there are no selected tags
}
