export function displayJobs(jobs) {
  const jobListings = document.getElementById("job-listings");
  jobListings.innerHTML = "";

  if (jobs.length === 0) {
    const noItemsMessage = document.createElement("div");
    noItemsMessage.classList.add("no-jobs");
    noItemsMessage.textContent = "No Jobs found, please change the filter";
    jobListings.appendChild(noItemsMessage);
    return;
  }

  jobs.forEach((job) => {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job-card");
    if (job.featured) {
      jobCard.classList.add("featured");
    }

    jobCard.innerHTML = `
        <div class="job-header">
          <img src="${job.logo}" alt="${job.company} logo">
          <div class="job-info">
            <div class="job-header">
              <span class="job-company">${job.company}</span>
              ${job.new ? '<span class="job-new">NEW!</span>' : ""}
              ${
                job.featured ? '<span class="job-featured">FEATURED</span>' : ""
              }
            </div>
            <h2 class="job-position">${job.position}</h2>
            <div class="job-details">
              <span class="job-posted-time">${job.postedAt}</span>
              <span class="job-contract">${job.contract}</span>
              <span class="job-location">${job.location}</span>
            </div>
          </div>
        </div>
        <div class="job-tags">
          <span class="job-role job-tag">${job.role}</span>
          <span class="job-level job-tag">${job.level}</span>
          ${job.languages
            .map((lang) => `<span class="job-language job-tag">${lang}</span>`)
            .join("")}
          ${job.tools
            .map((tool) => `<span class="job-tool job-tag">${tool}</span>`)
            .join("")}
        </div>
      `;

    jobListings.appendChild(jobCard);
  });

  document.querySelectorAll(".job-tag").forEach((tag) => {
    tag.addEventListener("click", handleTagClick);
  });
}

function handleTagClick(event) {
  const tag = event.target;
  const tagType = tag.classList.contains("job-role")
    ? "role"
    : tag.classList.contains("job-level")
    ? "level"
    : tag.classList.contains("job-language")
    ? "languages"
    : tag.classList.contains("job-tool")
    ? "tools"
    : null;

  if (tagType) {
    const tagValue = tag.textContent.trim();
    const filterSelector = `input[data-filter-type="${tagType}"][value="${tagValue}"]`;
    const filterInput = document.querySelector(filterSelector);

    if (filterInput) {
      filterInput.checked = true;
      filterInput.dispatchEvent(new Event("change"));
    }
  }
}
