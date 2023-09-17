class DropdownView {
  constructor() {
    this.dropdownHeader = document.querySelector(".dropdown-header");
    this.dropdownList = document.querySelector(".dropdown-list");
  }

  initEventListeners(updateModelCallback) {
    this.dropdownHeader.addEventListener("click", () => {
      this.dropdownList.classList.toggle("hidden");
      const chevron = this.dropdownHeader.querySelector(".chevron");
      chevron.classList.toggle("fa-chevron-down");
      chevron.classList.toggle("fa-chevron-up");
    });

    this.dropdownList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const selectedIngredient = event.target.textContent;
        updateModelCallback(selectedIngredient);
        this.dropdownList.classList.add("hidden");
      }
    });
  }

  render(model) {
    const ingredients = model.filters.ingredient;
    this.dropdownList.innerHTML = ingredients
      .map((ingredient) => `<li class="dropdown-item">${ingredient}</li>`)
      .join("");
  }
}

export default DropdownView;
