export function jobsQuery(jobs) {
  const jobListings = document.getElementById("jobListings");
  jobListings.innerHTML = "";

  // Loop through each job and HTML elements
  jobs.forEach((job) => {
    const jobElement = document.createElement("div");
    jobElement.classList.add("jobListing");

    // Add job details
    jobElement.innerHTML = `
        <div class="jobHeader">
          <div class="companyInfo">
            <strong>${job.company}</strong>
            ${job.new ? "<span class='badge new'>New!</span>" : ""}
            ${
              job.featured ? "<span class='badge featured'>Featured</span>" : ""
            }
          </div>
          <div class="position"><strong>${job.position}</strong></div>
          <div class="metaInfo">${job.postedAt} - ${job.contract} - ${
      job.location
    }</div>
        </div>
  
        <div class="jobDetails">
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
