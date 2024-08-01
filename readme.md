# Job Listings with Filtering Solution

This is a solution to the [Job Listings with Filtering challenge](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt).

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [App.js Main Methods](#appjs-main-methods)
    - [setProducts(data)](#setproductsdata)
    - [setFilteredCards(data)](#setfilteredcardsdata)
    - [addFilter(input)](#addfilterinput)
    - [removeFilter(input)](#removefilterinput)

## Overview

### The Challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on the categories

### Screenshot

![Screenshot](/design/screenshots.png)

## My Process

### Built With

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Pure JavaScript


### App.js Main Methods

#### setProducts(data)

- This method accept array of object as a jobs data and have a default value if nothing passed. Its generate cards for each job and append it to the DOM using other methods.

#### setFilteredCards(data)

- Same as the previous method but will check if the category meets the filter befor adding each job.
- for comparision with filters, I have merged category in one array and get the union between the selected category and the job categor, if the lenght still the same thats mean all selected filters is already in the job attribute.

```javascript
for (let i = 0; i < this.data.length; i++) {
  // merging job attribute in one array
  let filteringValues = [...this.data[i].languages, ...this.data[i].tools];
  filteringValues.push(this.data[i].role);
  filteringValues.push(this.data[i].level);

  // check if the job meets the selected filters
  if (
    [...new Set([...filteringValues, ...this.filterData.selectedFilter])]
      .length == filteringValues.length
  ) {
    this.appendCard(this.data[i]);
  }
}
```

#### addFilter(input)

- this method take ine filtering value (e.g. 'Python') and push it to the selected filters array and adding a filter button in the header then call setFilteredCard();

````javascript
if ( // chick if the filter is already selected
    this.filterData.isActive &&
    this.filterData.selectedFilter.includes(input)
  )
    return;

  if (!this.filterData.isActive) { // check if this is the first filter to show up the filter card in the header
    this.filterCard.classList.remove("hidden");
    this.container.style.paddingTop = "50px";
    this.filterData.isActive = true;
  }
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

  this.setFilteredCards();
 
````
### removeFilter (input)
 - This method remove the input filter from the header and selectedFilter array then recall the setFilteredCards();
 ```javascript
 if (this.filterData.selectedFilter.length == 1) return this.clearFilter();

    let inputIndex = this.filterData.selectedFilter.indexOf(input);
    this.filterData.selectedFilter.splice(inputIndex, 1);
    let filtersParent = document.getElementById("filters");
    filtersParent.removeChild(filtersParent.children[inputIndex]);

    this.setFilteredCards();
```