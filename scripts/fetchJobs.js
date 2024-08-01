let cachedJobs = null;

export async function fetchJobs() {
  if (cachedJobs) return cachedJobs;

  try {
    const response = await fetch("./data.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    cachedJobs = await response.json();
    return cachedJobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}
