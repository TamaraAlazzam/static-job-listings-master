import Job from "./job.js";

export default class Home {
   #filter = [];
   #jobs = [];
   #filteredJobs = [];

  constructor() {}

   addJob(job) {
    this.#jobs.push(job);

    this.loadHome();
}

   removeFilter(filterTag) {
    const index = this.#filter.indexOf(filterTag);
    if (index > -1) {
      this.#filter.splice(index, 1);
    }
    this.loadHome();
  }

   addFilter(filterTag) {
    if (!this.#filter.includes(filterTag)) {
      this.#filter.push(filterTag);
    }
    console.log(this.#filter);
    this.loadHome();
  }

   clearFilters() {
    this.#filter = [];
    this.loadHome();
  }

   loadHome() {
    this.#filterJobs();
    this.#displayJobs();
    this.#displayFilters();
  }

   #displayJobs() {
    let jobsDiv = document.querySelector(".jobs");
    jobsDiv.innerHTML = "";
    for (let job of this.#filteredJobs) {
      let jobItem = this.#createJobItemElement(job);
      jobsDiv.appendChild(jobItem);
    }
  }

   #filterJobs() {
    if (this.#filter.length == 0) {
      this.#filteredJobs = this.#jobs;
    } else {
      this.#filteredJobs = this.#jobs.filter((job) =>
        this.#filter.every((filterItem) => job.tags.includes(filterItem))
      );
    }
  }

   #displayFilters() {
    let filterTab = document.querySelector(".filter-tab");
    if (this.#filter < 1) {
      filterTab.style.display = "none";
    } else {
      filterTab.style.display = "flex";
    }

    let jobsDiv = document.querySelector(".filter-tab .left");
    jobsDiv.innerHTML = "";
    for (let filter of this.#filter) {
      let filterItem = this.#createFilterTagElement(filter);
      jobsDiv.append(filterItem);
    }
  }

   #createJobItemElement(job) {
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

    console.log(job.isNew);
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

   #createFilterTagElement(filter) {
    let filterTag = document.createElement("div");
    filterTag.classList.add("filter-tag");
    filterTag.textContent = filter;
    return filterTag;
  }
}
