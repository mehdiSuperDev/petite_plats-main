class DropdownView {
  constructor(dropdownType) {
    this.dropdownType = dropdownType;
    const container = document.querySelector(
      `.dropdown[data-type="${dropdownType}"]`
    );
    this.dropdownHeader = container.querySelector(".dropdown-header");
    this.dropdownList = container.querySelector(".dropdown-list");
  }

  toggleChevron() {
    const chevron = this.dropdownHeader.querySelector(".chevron");
    chevron.classList.toggle("fa-chevron-down");
    chevron.classList.toggle("fa-chevron-up");
  }

  initEventListeners(updateModelCallback) {
    this.dropdownHeader.addEventListener("click", () => {
      this.dropdownList.classList.toggle("hidden");
      this.toggleChevron();

      console.log("click on list");
    });

    this.dropdownList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const selectedType = event.target.getAttribute("data-type");
        const selectedValue = event.target.textContent;

        console.log("selectedType", selectedType);
        console.log("selectedValue", selectedValue);

        const chevron = this.dropdownHeader.querySelector(".chevron");
        chevron.classList.remove("fa-chevron-up");
        chevron.classList.add("fa-chevron-down");

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
