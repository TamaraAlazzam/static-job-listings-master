
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
    filter.style.padding = "20px";
    filter.style.width = "75%";
  
    const filterTags = filter.querySelector('.filter-tags');
    const elementClone = element.cloneNode(true);
    filterTags.appendChild(elementClone);
  
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-button';
    deleteBtn.innerHTML = 'X';
    filterTags.appendChild(deleteBtn);
  
    selectedFilters.push(element.textContent);
    filterJobListings();
  
    deleteBtn.addEventListener('click', () => {
      filterTags.removeChild(elementClone);
      filterTags.removeChild(deleteBtn);
      selectedFilters = selectedFilters.filter(filter => filter !== element.textContent);
      filterJobListings();
    });
  
    if (!document.querySelector('.clear')) {
      const clear = document.createElement('button');
      clear.innerHTML = "clear";
      clear.className = 'clear';
      clear.addEventListener('click', () => {
        filterTags.innerHTML = '';
        filter.style.padding = "0";
        filter.style.width = "0";
        filter.innerHTML='';
        selectedFilters = [];
        filterJobListings();
      });
      filter.appendChild(clear);
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
  
    const companyLogo = document.createElement('img');
    companyLogo.src = job.logo;
    companyLogo.alt = `${job.company} logo`;
    jobDiv.appendChild(companyLogo);
  
    const jobDetails = document.createElement('div');
    jobDetails.className = 'job-details';
    
    const companyName = document.createElement('div');
    companyName.className = 'company-name';
    const companyNameH2 = document.createElement('h2');
    companyNameH2.textContent = job.company;
    companyName.appendChild(companyNameH2);
  
    if (job.new) {
      const newSpan = document.createElement('span');
      newSpan.className = 'new';
      newSpan.textContent = 'NEW!';
      companyName.appendChild(newSpan);
    }
    if (job.featured) {
      const featuredSpan = document.createElement('span');
      featuredSpan.className = 'featured';
      featuredSpan.textContent = 'FEATURED';
      companyName.appendChild(featuredSpan);
    }
    jobDetails.appendChild(companyName);
  
    const position = document.createElement('h3');
    position.textContent = job.position;
    jobDetails.appendChild(position);
  
    const details = document.createElement('p');
    details.innerHTML = `
      ${job.postedAt} • ${job.contract} • ${job.location}
    `;
    jobDetails.appendChild(details);
  
    const tags = document.createElement('div');
    tags.className = 'tags';
  
    const languages = document.createElement('div');
    languages.className = 'languages';
    job.languages.forEach(language => {
      const languageTag = document.createElement('span');
      languageTag.className = 'tag';
      languageTag.textContent = language;
      languageTag.addEventListener('click', () => displayJobFilter(languageTag));
      languages.appendChild(languageTag);
    });
  
    const roles = document.createElement('div');
    roles.className = 'roles';
    const level = document.createElement('span');
    level.textContent = job.level;
    level.className = 'tag';
    level.addEventListener('click', () => displayJobFilter(level));
  
    const role = document.createElement('span');
    role.textContent = job.role;
    role.className = 'tag';
    role.addEventListener('click', () => displayJobFilter(role));
    roles.appendChild(role);
    roles.appendChild(level);
    tags.appendChild(roles);
    tags.appendChild(languages);
  
    const tools = document.createElement('div');
    tools.className = 'tools';
    job.tools.forEach(tool => {
      const toolTag = document.createElement('span');
      toolTag.className = 'tag';
      toolTag.textContent = tool;
      toolTag.addEventListener('click', () => displayJobFilter(toolTag));
      tools.appendChild(toolTag);
    });
    tags.appendChild(tools);
  
    jobDiv.appendChild(jobDetails);
    jobDiv.appendChild(tags);
  
    return jobDiv;
  }
  


