import { fetchJobs } from "./fetchJobs.js";
import { displayJobs } from "./displayJobs.js";

let jobs = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchJobs().then((data) => {
    jobs = data;
    displayJobs(jobs);
  });

  const resetButton = document.querySelector('button[type="reset"]');
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      document
        .querySelectorAll('.filter[type="checkbox"]')
        .forEach((checkbox) => {
          checkbox.checked = false;
        });

      document.querySelectorAll('.filter[type="radio"]').forEach((radio) => {
        radio.checked = false;
      });

      document.querySelectorAll('input[value="Any"]').forEach((radio) => {
        radio.checked = true;
      });

      displayJobs(jobs);
    });
  }
});
