import { escapeHTML } from "../helpers/utils";

class DropdownView {
  constructor(dropdownType) {
    this.dropdownType = dropdownType;
    const container = document.querySelector(
      `.dropdown[data-type="${dropdownType}"]`
    );
    this.dropdownHeader = container.querySelector(".dropdown-header");
    this.dropdownList = container.querySelector(".dropdown-list");
    this.searchBarDropdown = this.dropdownList.querySelector(
      ".search-bar-dropdown"
    );
    this.dropdownOptionsList =
      this.dropdownList.querySelector(".dropdown-options");
    this.clearIcon = this.dropdownList.querySelector(".clear-icon-dropdown");
  }

  toggleChevron() {
    const chevron = this.dropdownHeader.querySelector(".chevron");
    chevron.classList.toggle("fa-chevron-down");
    chevron.classList.toggle("fa-chevron-up");
  }

  clearSearchBar() {
    // Vider la barre de recherche
    this.searchBarDropdown.value = "";
    this.clearIcon.classList.add("hidden");

    // Montrer tous les éléments cachés dans la liste
    const items = this.dropdownOptionsList.querySelectorAll("li.hidden");
    items.forEach((item) => {
      item.classList.remove("hidden");
    });
  }

  initEventListeners(updateModelCallback) {
    this.dropdownHeader.addEventListener("click", () => {
      this.dropdownList.classList.toggle("hidden");
      this.toggleChevron();

      this.clearSearchBar();
    });

    this.dropdownList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const selectedType = event.target.getAttribute("data-type");
        const selectedValue = event.target.textContent;

        const chevron = this.dropdownHeader.querySelector(".chevron");
        chevron.classList.remove("fa-chevron-up");
        chevron.classList.add("fa-chevron-down");

        updateModelCallback(selectedType, selectedValue);

        this.dropdownList.classList.add("hidden");
        this.clearSearchBar();
      }
    });

    this.searchBarDropdown.addEventListener("input", (event) => {
      const query = escapeHTML(event.target.value.toLowerCase());
      if (query.length > 0) {
        this.clearIcon.classList.remove("hidden");
      } else {
        this.clearIcon.classList.add("hidden");
      }

      const items = this.dropdownOptionsList.querySelectorAll("li");
      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });

    this.clearIcon.addEventListener("click", () => {
      this.clearSearchBar();
    });
  }

  render(model) {
    const items = model.filters[this.dropdownType];
    // console.log(`Items from model in render:`, items);
    this.dropdownOptionsList.innerHTML = items
      .map(
        (item) =>
          `<li class="dropdown-item my-2" data-type="${this.dropdownType}">${item}</li>`
      )
      .join("");
  }
}

export default DropdownView;
