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
          <span class="job-role">${job.role}</span>
          <span class="job-level">${job.level}</span>
          ${job.languages
            .map((lang) => `<span class="job-language">${lang}</span>`)
            .join("")}
          ${job.tools
            .map((tool) => `<span class="job-tool">${tool}</span>`)
            .join("")}
        </div>
      `;

    jobListings.appendChild(jobCard);
  });
}
