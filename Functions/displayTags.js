export function displayTags(jobs) {
  const uniqueTags = new Set(); // To avoid duplicates

  // Collect unique tags from the job data
  jobs.forEach((job) => {
    uniqueTags.add(job.role);
    uniqueTags.add(job.level);
    job.languages.forEach((lang) => uniqueTags.add(lang));
    job.tools.forEach((tool) => uniqueTags.add(tool));
  });

  // Add the unique tags to the header and make them clickable
  const availableTags = document.getElementById("availableTags");
  availableTags.innerHTML = Array.from(uniqueTags)
    .map((tag) => `<li class="availableTag">${tag}</li>`)
    .join("");
}
