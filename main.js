document.addEventListener("DOMContentLoaded", function () {
  // Initialize an empty array to store the selected tags
  let selectedFilters = [];

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // Call the function displayTags($$$) to display (roles, levels, etc.) at the header of the page
      displayTags(data);

      // Call the function jobsQuery($$$) to display all job listings
      jobsQuery(data);

      // Add a click event listener for tag selection and clearing
      document.addEventListener("click", function (e) {
        //select or deselect the tag
        if (e.target.classList.contains("available-tag")) {
          const tag = e.target.textContent.trim(); // Get the text of the clicked tag

          // If the tag is already selected, remove it from the selected filters
          if (e.target.classList.contains("active")) {
            selectedFilters = selectedFilters.filter(
              (filter) => filter !== tag
            );
            e.target.classList.remove("active"); // Remove the active class
          } else {
            // If the tag is not active, add it to the selected filters
            selectedFilters.push(tag);
            e.target.classList.add("active"); // Add the active class
          }

          // Call filterJobs($$$) to filter jobs based on the selected filters
          filterJobs(data);
          updateClearButton(); // Show or hide "Clear" based on selected filters
        }

        // If the "Clear" button is clicked, reset everything
        if (e.target.id === "clear-filters") {
          selectedFilters = []; // Deleting all tags selected in the array of selected filters

          document
            .querySelectorAll(".available-tag")
            .forEach((tag) => tag.classList.remove("active"));
          filterJobs(data); // Show the initial Job Listings again
          updateClearButton(); // Hide the "Clear" button since there are no selected tags
        }
      });
    });

  // Function to display job listings on the page
  function jobsQuery(jobs) {
    const jobListings = document.getElementById("job-listings");
    jobListings.innerHTML = "";

    // Loop through each User and create a job listing HTML element
    jobs.forEach((job) => {
      const jobElement = document.createElement("div");
      jobElement.classList.add("job-listing");

      // Add job details
      jobElement.innerHTML = `
        <div class="job-header">
          <div class="company-info">
            <strong>${job.company}</strong>
            ${job.new ? "<span class='badge new'>New!</span>" : ""}
            ${
              job.featured ? "<span class='badge featured'>Featured</span>" : ""
            }
          </div>
          <div class="position"><strong>${job.position}</strong></div>
          <div class="meta-info">${job.postedAt} - ${job.contract} - ${
        job.location
      }</div>
        </div>

        <div class="job-details">
          <div class="tags">
            <div class="tag">${job.role}</div>
            <div class="tag">${job.level}</div>
            ${job.languages
              .map((lang) => `<div class="tag">${lang}</div>`)
              .join("")}
            ${job.tools
              .map((tool) => `<div class="tag">${tool}</div>`)
              .join("")}
          </div>
        </div>
      `;

      // Append the job element to the job listings container
      jobListings.appendChild(jobElement);
    });
  }

  // Function to display unique tags (roles, levels, languages, tools) in the header
  function displayTags(jobs) {
    const uniqueTags = new Set(); // I used Set to avoid Duplicates

    // Loop through all users and collect only unique tags
    jobs.forEach((job) => {
      uniqueTags.add(job.role);
      uniqueTags.add(job.level);
      job.languages.forEach((lang) => uniqueTags.add(lang));
      job.tools.forEach((tool) => uniqueTags.add(tool));
    });

    // Add the tags to the header and made them Clickable
    const availableTags = document.getElementById("available-tags");
    availableTags.innerHTML = Array.from(uniqueTags)
      .map((tag) => `<li class="available-tag">${tag}</li>`)
      .join("");
  }

  // Function to filter jobs based on selected tags
  function filterJobs(jobs) {
    const filteredJobs = jobs.filter((job) => {
      const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
      // Check if every selected filter is present in the job's tags
      return selectedFilters.every((filter) => jobTags.includes(filter));
    });

    // Display the filtered jobs
    jobsQuery(filteredJobs);
  }

  // Function to update the visibility of the "Clear"
  function updateClearButton() {
    const clearButton = document.getElementById("clear-filters");
    if (selectedFilters.length > 0) {
      clearButton.style.display = "block";
    } else {
      clearButton.style.display = "none";
    }
  }
});
