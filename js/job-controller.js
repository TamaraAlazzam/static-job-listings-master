import Job from "./job.js";

export default class JobController {
  #activeFilters = [];
  #allJobs = [];
  #displayedJobs = [];

  // html elements
  #jobsDiv;
  #filterTab;
  #filterContainer;

  constructor() {
    this.#jobsDiv = document.querySelector(".jobs");
    this.#filterTab = document.querySelector(".filter-tab");
    this.#filterContainer = document.querySelector(".filter-tab .left");
  }

  addJobToList(job) {
    this.#allJobs.push(job);
    this.updateJobDisplay();
  }

  removeFilterTag(filterTag) {
    const index = this.#activeFilters.indexOf(filterTag);
    if (index > -1) {
      this.#activeFilters.splice(index, 1);
    }
    this.updateJobDisplay();
  }

  addFilterTag(filterTag) {
    if (!this.#activeFilters.includes(filterTag)) {
      this.#activeFilters.push(filterTag);
    }
    this.updateJobDisplay();
  }

  clearAllFilters() {
    this.#activeFilters = [];
    this.updateJobDisplay();
  }

  updateJobDisplay() {
    this.#applyFilters();
    this.renderDisplayedJobs();
    this.#updateFilterDisplay();
  }

  renderDisplayedJobs() {
    this.#jobsDiv.innerHTML = "";
    for (let job of this.#displayedJobs) {
      let jobItem = this.#createJobCardElement(job);
      this.#jobsDiv.appendChild(jobItem);
    }
  }

  #applyFilters() {
    if (this.#activeFilters.length === 0) {
      this.#displayedJobs = this.#allJobs;
    } else {
      this.#displayedJobs = this.#allJobs.filter((job) =>
        this.#activeFilters.every((filterItem) => job.tags.includes(filterItem))
      );
    }
  }

  #updateFilterDisplay() {
    this.#filterTab.style.display =
      this.#activeFilters.length < 1 ? "none" : "flex";
    this.#filterContainer.innerHTML = "";
    for (let filter of this.#activeFilters) {
      let filterItem = this.#createFilterTagElement(filter);
      this.#filterContainer.append(filterItem);
    }
  }

  #createJobCardElement(job) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    if (job.featured) {
      itemDiv.classList.add("featured-item");
    }

    const img = document.createElement("img");
    img.className = "company-image";
    img.src = job.logo;
    img.alt = `${job.company} Company Image`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "content";

    const companyStatusDiv = document.createElement("div");
    companyStatusDiv.className = "company-status";
    companyStatusDiv.innerHTML = job.company + " ";

    if (job.isNew) {
      companyStatusDiv.innerHTML += `<span class="new">New!</span>`;
    }
    if (job.featured) {
      companyStatusDiv.innerHTML += `<span class="featured-span">featured</span>`;
    }

    const jobTitleDiv = document.createElement("div");
    jobTitleDiv.className = "job-title";
    jobTitleDiv.textContent = job.position;

    const jobAboutDiv = document.createElement("div");
    jobAboutDiv.className = "job-about";
    jobAboutDiv.textContent = `${job.postedAt}  .  ${job.contract}  .  ${job.location}`;

    contentDiv.appendChild(companyStatusDiv);
    contentDiv.appendChild(jobTitleDiv);
    contentDiv.appendChild(jobAboutDiv);

    const hr = document.createElement("hr");

    const tagsDiv = document.createElement("div");
    tagsDiv.className = "tags";

    if (job.tags.length > 0) {
      job.tags.forEach((tag) => {
        const tagSpan = document.createElement("span");
        tagSpan.className = "tag";
        tagSpan.textContent = tag;
        tagsDiv.appendChild(tagSpan);
      });
    }

    itemDiv.appendChild(img);
    itemDiv.appendChild(contentDiv);
    itemDiv.appendChild(hr);
    itemDiv.appendChild(tagsDiv);

    return itemDiv;
  }

  #createFilterTagElement(filterTag) {
    let filterTagElement = document.createElement("div");
    filterTagElement.classList.add("filter-tag");
    filterTagElement.textContent = filterTag;
    return filterTagElement;
  }
}
