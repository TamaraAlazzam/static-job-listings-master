document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".toggle-button");
  const filtersForm = document.getElementById("filters-form");

  toggleButton.addEventListener("click", () => {
    if (filtersForm.classList.contains("hidden")) {
      filtersForm.classList.remove("hidden");
    } else {
      filtersForm.classList.add("hidden");
    }
  });
});
