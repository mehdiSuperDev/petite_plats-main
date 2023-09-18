class DropdownView {
  constructor(dropdownType) {
    this.dropdownType = dropdownType;
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
        const selectedType = event.target.getAttribute("data-type");
        const selectedValue = event.target.textContent;

        updateModelCallback(selectedType, selectedValue);

        this.dropdownList.classList.add("hidden");
      }
    });
  }

  render(model) {
    const items = model.filters[this.dropdownType];
    this.dropdownList.innerHTML = items
      .map(
        (item) =>
          `<li class="dropdown-item" data-type="${this.dropdownType}">${item}</li>`
      )
      .join("");
  }
}

export default DropdownView;
