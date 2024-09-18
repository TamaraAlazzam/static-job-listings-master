export function filterJobs(selectedFilters, jobs, jobsQuery) {
  const filteredJobs = jobs.filter((job) => {
    const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
    // Check if every selected filter is present in the job's tags
    return selectedFilters.every((filter) => jobTags.includes(filter));
  });

  // Display the filtered jobs
  jobsQuery(filteredJobs);
}
