let cachedJobs = null;

export async function fetchJobs() {
  if (cachedJobs) {
    return cachedJobs;
  }

  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    cachedJobs = data;
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}
