async function fetchingData() {
  try {
    let response = await fetch("./data.json");
    let data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching JSON:", error);
    return null;
  }
}

export const app = {
  data: await fetchingData(),
  filterCard: document.getElementById("filter-card"),
  container: document.getElementById("cards-container"),
  filterData: {
    selectedFilter: [],
    isActive: false,
  },
  setCards: async function (data = this.data) {
    this.container.innerHTML = "";
    for (let job of this.data) {
      this.appendCard(job);
    }
  },
  addFilter: function (input) {
    if (
      this.filterData.isActive &&
      this.filterData.selectedFilter.includes(input)
    )
      return;

    if (!this.filterData.isActive) {
      this.filterCard.classList.remove("hidden");
      this.container.style.paddingTop = "50px";
    }
    this.filterData.isActive = true;
    this.filterData.selectedFilter.push(input);

    let filterParent = document.createElement("div");
    filterParent.className = "filter";
    filterParent.innerHTML = `<span>${input}</span>`;

    document.getElementById("filters").appendChild(filterParent);

    let newFilterBtn = document.createElement("span");
    newFilterBtn.innerHTML = "X";
    newFilterBtn.className = "remove-filter";
    newFilterBtn.addEventListener("click", () => this.removeFilter(input));
    filterParent.appendChild(newFilterBtn);

    this.container.innerHTML = "";
    for (let i = 0; i < this.data.length; i++) {
      let filteringValues = this.data[i].languages.concat(this.data[i].tools);
      filteringValues.push(this.data[i].role);
      filteringValues.push(this.data[i].level);

      let isSatisfied = true;
      for (let item of this.filterData.selectedFilter) {
        if (!filteringValues.includes(item)) {
          isSatisfied = false;
          break;
        }
      }

      if (isSatisfied) {
        this.appendCard(this.data[i]);
      }
    }
  },
  removeFilter: function (input) {
    if(this.filterData.selectedFilter.length == 1) this.clearFilter();
    let inputIndex = this.filterData.selectedFilter.indexOf(input);
    this.filterData.selectedFilter.splice(inputIndex, 1);
    let filtersParent = document.getElementById("filters");
    for (let child of filtersParent.children) {
      if (child.children[0].innerHTML == input) {
        console.log(child);
        filtersParent.removeChild(child);
        break;
      }
    }
    this.container.innerHTML = "";
    for (let i = 0; i < this.data.length; i++) {
      let filteringValues = this.data[i].languages.concat(this.data[i].tools);
      filteringValues.push(this.data[i].role);
      filteringValues.push(this.data[i].level);

      let isSatisfied = true;
      for (let item of this.filterData.selectedFilter) {
        if (!filteringValues.includes(item)) {
          isSatisfied = false;
          break;
        }
      }

      if (isSatisfied) {
        this.appendCard(this.data[i]);
      }
    }
  },
  appendCard: function (obj) {
    let card = document.createElement("div");
    card.className = "card";
    card.setAttribute("data-new", obj.new);
    card.setAttribute("data-featured", obj.featured);
    card.innerHTML = `  <img
                              src=".${obj.logo}"
                              alt="${obj.company} logo"
                              class="company-img"
                            />
                            <div class="row">
                              <span class="company">${obj.company}</span>
                              <div class="tags">
                            </div>
                              <span class="tag" data-new="${obj.new}">New!</span>
                              <span class="tag" data-featured="${obj.featured}">Featured</span>
                            </div>
                            <span class="position">${obj.position}</span>
                            <div class="info">${obj.postedAt} &#x2022; 
                                                ${obj.contract} &#x2022;  
                                                ${obj.location}
                            </div>`;

    let filters = document.createElement("div");
    filters.className = "filters";
    card.appendChild(filters);

    let roleFilter = document.createElement("span");
    roleFilter.setAttribute("data-filter", "role");
    roleFilter.className = "filter";
    roleFilter.innerHTML = obj.role;
    roleFilter.addEventListener("click", (event) => this.addFilter(obj.role));
    filters.appendChild(roleFilter);

    let levelFilter = document.createElement("span");
    levelFilter.setAttribute("data-filter", "level");
    levelFilter.className = "filter";
    levelFilter.innerHTML = obj.level;
    levelFilter.addEventListener("click", (event) => this.addFilter(obj.level));
    filters.appendChild(levelFilter);

    for (let j = 0; j < obj.languages.length; j++) {
      let languageFilter = document.createElement("span");
      languageFilter.setAttribute("data-filter", "language");
      languageFilter.className = "filter";
      languageFilter.innerHTML = obj.languages[j];
      languageFilter.addEventListener("click", (event) =>
        this.addFilter(obj.languages[j])
      );
      filters.appendChild(languageFilter);
    }
    for (let j = 0; j < obj.tools.length; j++) {
      let toolFilter = document.createElement("span");
      toolFilter.setAttribute("data-filter", "tool");
      toolFilter.className = "filter";
      toolFilter.innerHTML = obj.tools[j];
      toolFilter.addEventListener("click", (event) =>
        this.addFilter(obj.tools[j])
      );
      filters.appendChild(toolFilter);
    }
    this.container.appendChild(card);
  },
  clearFilter: function() {
    this.filterData.isActive = false;
    this.filterData.selectedFilter = [];
    this.filterCard.children[0].innerHTML = '';
    this.filterCard.classList.add('hidden');
    this.container.style.paddingTop = '20px';
    this.setCards();
  }
};
