import { applyFilters, filterCriteria } from "./filterJobs.js";

export function displayJobs(jobs) {
  const jobListings = document.getElementById("job-listings");
  jobListings.innerHTML = "";

  if (jobs.length === 0) {
    const noItemsMessage = document.createElement("div");
    noItemsMessage.classList.add("no-jobs");
    noItemsMessage.textContent = "No Jobs found, please change the filter.";
    jobListings.appendChild(noItemsMessage);
    return;
  }

  jobs.forEach((job) => {
    const jobCard = createJobCard(job);
    jobListings.appendChild(jobCard);
  });

  document.querySelectorAll(".job-tag").forEach((tag) => {
    tag.addEventListener("click", handleTagClick);
  });
}

function createJobCard(job) {
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
          ${job.featured ? '<span class="job-featured">FEATURED</span>' : ""}
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
      <span class="job-role job-tag" data-filter-type="role" data-value="${
        job.role
      }">${job.role}</span>
      <span class="job-level job-tag" data-filter-type="level" data-value="${
        job.level
      }">${job.level}</span>
      ${job.languages
        .map(
          (lang) =>
            `<span class="job-language job-tag" data-filter-type="languages" data-value="${lang}">${lang}</span>`
        )
        .join("")}
      ${job.tools
        .map(
          (tool) =>
            `<span class="job-tool job-tag" data-filter-type="tools" data-value="${tool}">${tool}</span>`
        )
        .join("")}
    </div>
  `;

  return jobCard;
}

function handleTagClick(event) {
  const tag = event.target;
  const tagType = tag.getAttribute("data-filter-type");
  const tagValue = tag.getAttribute("data-value");

  if (tagType && tagValue && !filterCriteria[tagType].includes(tagValue)) {
    filterCriteria[tagType].push(tagValue);
    applyFilters();
  }
}
