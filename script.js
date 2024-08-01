document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('data.json');
    const jobListings = await response.json();
    window.jobListings = jobListings;
    displayJobListings(jobListings);
  } catch (error) {
    console.error('Error fetching job listings:', error);
  }
});

let selectedFilters = [];

function displayJobListings(jobListings) {
  const container = document.getElementById('job-listings-container');
  container.innerHTML = '';
  jobListings.forEach(job => {
    const jobListing = createJobListing(job);
    container.appendChild(jobListing);
  });
}

function displayJobFilter(element) {
  const filter = document.getElementById('job-filter');
  const filterTags = filter.querySelector('.filter-tags');

  filter.style.padding = "20px";
  filter.style.width = "75%";

  const elementClone = element.cloneNode(true);
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-button';
  deleteBtn.innerHTML = 'X';
  

  filterTags.appendChild(elementClone);
  filterTags.appendChild(deleteBtn);

  selectedFilters.push(element.textContent);
  filterJobListings();

  deleteBtn.addEventListener('click', () => {
    filterTags.removeChild(elementClone);
    selectedFilters = selectedFilters.filter(filter => filter !== element.textContent);
    deleteBtn.remove();
    filterJobListings();
  });

  if (!filter.querySelector('.clear')) {
    const clearBtn = document.createElement('button');
    clearBtn.innerHTML = "Clear";
    clearBtn.className = 'clear';
    clearBtn.addEventListener('click', () => {
      filterTags.innerHTML = '';
      filter.style.padding = "0";
      filter.style.width = "0";
      clearBtn.remove();
      selectedFilters = [];
      filterJobListings();
    });
    filter.appendChild(clearBtn);
  }
}



function filterJobListings() {
  if (selectedFilters.length === 0) {
    displayJobListings(window.jobListings);
    return;
  }

  const filteredListings = window.jobListings.filter(job => {
    const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
    return selectedFilters.every(filter => jobTags.includes(filter));
  });

  displayJobListings(filteredListings);
}



function createJobListing(job) {
  const jobDiv = document.createElement('div');
  jobDiv.className = 'job-listing';
  jobDiv.innerHTML = `
    <img src="${job.logo}" alt="${job.company} logo">

    <div class="job-details">
      <div class="company-name">
        <h2>${job.company}</h2>
        ${job.new ? '<span class="new">NEW!</span>' : ''}
        ${job.featured ? '<span class="featured">FEATURED</span>' : ''}
      </div>
      <h3>${job.position}</h3>
      <p>${job.postedAt} • ${job.contract} • ${job.location}</p>
    </div>

    <div class="tags">
        <span class="tag">${job.role}</span>
        <span class="tag">${job.level}</span>
        ${job.languages.map(language => `<span class="tag">${language}</span>`).join('')}
        ${job.tools.map(tool => `<span class="tag">${tool}</span>`).join('')}
    </div>
  `;

  const tagsContainer = jobDiv.querySelector('.tags');
  tagsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('tag')) {
      displayJobFilter(event.target);
    }
  });
  

  return jobDiv;
}
