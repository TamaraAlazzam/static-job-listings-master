import Job from "./job.js";
import JobController from "./job-controller.js";

export function fetchAndProcessJobData() {
    return fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          console.error(`Error Fetching Data Response Code: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const jobController = new JobController();
        data.forEach((jobObject) => {
          try {
            const job = new Job({
              id:        jobObject.id,
              company:   jobObject.company,
              logo:      jobObject.logo,
              new:     jobObject.new,
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
            jobController.addJobToList(job);
          } catch (error) {
            console.error("Error creating Job:", error);
          }
        });
        jobController.updateJobDisplay();
        return jobController;
      })
      .catch((error) => {
        console.error("Error fetching or processing JSON file:", error);
      });
  }