const container = document.createElement("div");
container.classList.add("container");
let search_bar = document.getElementById("search_bar");
let search_container = document.getElementById("search_container");
document.body.append(container);
let selected_words = [];

let fetchedData = [];

async function fetchData() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    fetchedData = data;
    filter_data(data, selected_words);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function filter_data(data, selected_words) {
  let filtered_array = [];

  if (selected_words.length === 0) {
    display_data(data);
  }

  data.forEach((job) => {
    let match = true;
    for (let word of selected_words) {
      if (
        job.role !== word &&
        job.level !== word &&
        !job.languages.includes(word) &&
        !job.tools.includes(word)
      ) {
        match = false;
        break;
      }
    }
    if (match) {
      filtered_array.push(job);
    }
  });
  display_data(filtered_array);
}

function display_data(data) {
  container.innerHTML = "";
  data.forEach((job) => {
    const {
      company,
      logo,
      New,
      featured,
      position,
      role,
      level,
      postedAt,
      contract,
      location,
      languages,
      tools,
    } = job;

    let toolsButtons = "";
    toolsButtons += `<button onclick="filter('${role}')">${role}</button>`;
    toolsButtons += `<button onclick="filter('${level}')">${level}</button>`;
    if (tools.length > 0) {
      tools.forEach((tool) => {
        toolsButtons += `<button onclick="filter('${tool}')">${tool}</button>`;
      });
    }
    if (languages && languages.length > 0) {
      languages.forEach((language) => {
        toolsButtons += `<button onclick="filter('${language}')">${language}</button>`;
      });
    }
    const cardClass = featured ? "job-cards featured-job" : "job-cards";
    let jobCardHTML = `
      <div class="${cardClass}">
        <img src="${logo}" id="logo" alt="" />

        <div class="information">
          <div class="heading">
            <span class="company">${company}</span>
             ${New ? '<span class="primary_span">New!</span>' : ""} 
             ${featured ? '<span class="dark_span">Featuerd</span>' : ""} 
          </div>
          <h3 id="position">${position}</h3>
          <span class="submit_time"> ${postedAt} . ${contract} .${location}</span>
        </div>
        <div class="specialities">
        ${toolsButtons}
        </div>
      </div>
    `;
    container.innerHTML += jobCardHTML;
  });
}

function filter(input) {
  let word_buttons = "";
  if (!selected_words.includes(input)) {
    selected_words.push(input);
  }
  search_container.style.display = "flex";
  selected_words.forEach((word) => {
    word_buttons += `<div class="filter_buttons" ><span>${word}</span><button class="filterbutton" onclick="item_clear('${word}')">X</button></div>`;
  });
  search_bar.innerHTML = word_buttons;
  filter_data(fetchedData, selected_words);
}

function full_clear() {
  search_container.style.display = "none";
  selected_words = [];
  search_bar.textContent = "";
  filter_data(fetchedData, selected_words);
}
function item_clear(word) {
  const index = selected_words.indexOf(word);

  if (index > -1) {
    selected_words.splice(index, 1);
    if (selected_words.length === 0) {
      search_container.style.display = "none";
      search_bar.textContent = "";
    }
  } else {
    search_bar.textContent = "";
  }

  update_filter(selected_words);
  filter_data(fetchedData, selected_words);
}

function update_filter(input) {
  let word_buttons = "";
  input.forEach((word) => {
    word_buttons += `<div><span>${word}</span><button class="filterbutton" onclick="item_clear('${word}')">X</button></div>`;
  });
  search_bar.innerHTML = "";
  search_bar.innerHTML = word_buttons;
  filter_data(fetchedData, selected_words);
}
fetchData();
