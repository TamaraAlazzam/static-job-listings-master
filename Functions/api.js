export async function fetchJobs() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("Error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}
