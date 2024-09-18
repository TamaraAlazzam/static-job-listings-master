import { displayTags } from "./Functions/displayTags.js";
import { updateClearButton, clearFilters } from "./Functions/clearButton.js";
import { filterJobs } from "./Functions/filterJobs.js";
import { fetchJobs } from "./Functions/api.js";
import { jobsQuery } from "./Functions/jobsQuery.js";
document.addEventListener("DOMContentLoaded", async function () {
  // Initialize an empty array to store the selected tags
  let selectedFilters = [];

  // Fetch job data
  const data = await fetchJobs();

  // Call displayTags to display tags (roles, levels, etc.)
  displayTags(data);

  // Display all job listings
  jobsQuery(data);

  // Add a click event listener for tag selection and clearing
  document.addEventListener("click", function (e) {
    // Select or deselect the tag
    if (e.target.classList.contains("availableTag")) {
      const tag = e.target.textContent.trim(); // Get the text of the clicked tag

      // If the tag is already selected, remove it from the selected filters
      if (e.target.classList.contains("active")) {
        selectedFilters = selectedFilters.filter((filter) => filter !== tag);
        e.target.classList.remove("active"); // Remove the active class
      } else {
        // If the tag is not active, add it to the selected filters
        selectedFilters.push(tag);
        e.target.classList.add("active"); // Add the active class
      }

      // Filter jobs based on selected tags
      filterJobs(selectedFilters, data, jobsQuery);
      updateClearButton(selectedFilters); // Show or hide "Clear" based on selected filters
    }

    // If the Clear  is clicked, reset everything
    if (e.target.id === "clearFilters") {
      clearFilters(selectedFilters, data, jobsQuery); // Reset filters and show all jobs
    }
  });
});
