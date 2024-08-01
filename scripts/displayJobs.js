import { applyFilters, filterCriteria } from "./filterJobs.js";

export function displayJobs(jobs) {
  const jobListings = document.getElementById("job-listings");
  jobListings.innerHTML = "";

  if (jobs.length === 0) {
    showNoJobsMessage(jobListings);
    return;
  }

  const fragment = document.createDocumentFragment();
  jobs.forEach((job) => fragment.appendChild(createJobCard(job)));
  jobListings.appendChild(fragment);

  document.querySelectorAll(".job-tag").forEach((tag) => {
    tag.addEventListener("click", handleTagClick);
  });
}

function showNoJobsMessage(container) {
  const noItemsMessage = document.createElement("div");
  noItemsMessage.classList.add("no-jobs");
  noItemsMessage.textContent = "No Jobs found, please change the filter.";
  container.appendChild(noItemsMessage);
}

function createJobCard(job) {
  const jobCard = document.createElement("div");
  jobCard.classList.add("job-card");
  if (job.featured) jobCard.classList.add("featured");

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
      ${createJobTags(job)}
    </div>
  `;

  return jobCard;
}

function createJobTags(job) {
  return `
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
  `;
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
