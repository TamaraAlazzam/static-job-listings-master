export function setupEventListeners(jobController) {
  document.addEventListener("click", (event) => {
    try {
      if (event.target.matches(".tag")) {
        const filterTag = event.target.textContent;
        jobController.addFilterTag(filterTag);
      } else if (event.target.matches(".filter-tag")) {
        const filterTag = event.target.textContent;
        jobController.removeFilterTag(filterTag);
      } else if (event.target.matches(".clear-filter-btn")) {
        jobController.clearAllFilters();
      }
    } catch (error) {
      console.error("Error handling click event:", error);
    }
  });
}
