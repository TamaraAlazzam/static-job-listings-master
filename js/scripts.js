import Job from "./job.js";
import Home from "./home-page.js";

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  fetch("/data.json")
    .then((response) => response.json())
    .then((data) => {
      // Load Home
      let homePage = new Home();
      for (let jobObject of data) {
        let job = new Job({
          id:        jobObject.id,
          company:   jobObject.company,
          logo:      jobObject.logo,
          new:       jobObject.new,
          featured:  jobObject.featured,
          position:  jobObject.position,
          role:      jobObject.role,
          level:     jobObject.level,
          postedAt:  jobObject.postedAt,
          contract:  jobObject.contract,
          location:  jobObject.location,
          languages: jobObject.languages,
          tools:     jobObject.tools,
        });

        console.log(job.isNew);

        homePage.addJob(job);
      }

      homePage.loadHome();

      // Events
      document.addEventListener("click", function (event) {
        if (event.target.matches(".tag")) {
          homePage.addFilter(event.target.textContent);
        }
      });

      document.addEventListener("click", function (event) {
        if (event.target.matches(".filter-tag")) {
          homePage.removeFilter(event.target.textContent);
        }
      });

      let clearButton = document.querySelector(".clear-filter-btn");
      clearButton.addEventListener("click", function () {
        homePage.clearFilters();
      });
    })
    .catch((error) => {
      console.error("Error fetching the JSON file:", error);
    });
});
