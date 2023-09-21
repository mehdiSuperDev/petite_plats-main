import CardView from "../views/CardView";
import SearchBarView from "../views/searchBarView";
import DropdownView from "../views/dropdownView";
import CounterView from "../views/counterView";

class SearchController {
  constructor(model, recipeService) {
    this.model = model;
    this.recipeService = recipeService;

    this.searchBarView = new SearchBarView();
    this.cardView = new CardView();

    this.ingredientDropdownView = new DropdownView("ingredient");
    this.applianceDropdownView = new DropdownView("appliance");
    this.ustensilsDropdownView = new DropdownView("ustensils");

    this.counterView = new CounterView("1500");
  }

  init() {
    this.searchBarView.initEventListeners(
      this.updateModelFromSearchBar.bind(this)
    );

    this.ingredientDropdownView.initEventListeners(
      this.updateModelFromDropdown.bind(this)
    );
    this.applianceDropdownView.initEventListeners(
      this.updateModelFromDropdown.bind(this)
    );
    this.ustensilsDropdownView.initEventListeners(
      this.updateModelFromDropdown.bind(this)
    );

    this.updateModelFromSearchBar("");

    this.updateView();
  }

  updateModelFromSearchBar(searchText) {
    const result =
      searchText.length >= 3
        ? this.recipeService.search(searchText)
        : this.recipeService.search("");

    this.model.setRecipes(result.recipes);
    this.model.setSearchText(searchText);
    this.model.setLocalFilters(result.filters);
    this.updateView();
  }

  createTag(type, value) {
    const tagHTML = `
      <div class="tag-view" data-type="${type}" data-value="${value}">
        <span class="tag-content">${value}</span>
        <span class="tag-close space-x-4 cursor-pointer">X</span>
      </div>
    `;

    const tagContainer = document.querySelector(".tag-container");
    tagContainer.insertAdjacentHTML("beforeend", tagHTML);

    const tagElement = tagContainer.lastElementChild;
    const tagCloseBtn = tagElement.querySelector(".tag-close");

    tagCloseBtn.addEventListener("click", () => {
      this.removeTag(type, value);
    });

    this.updateView();
  }

  removeTag(type, value) {
    this.model.removeTag(type, value);

    const tagContainer = document.querySelector(".tag-container");
    const tagToRemove = tagContainer.querySelector(
      `[data-type="${type}"][data-value="${value}"]`
    );
    tagToRemove.remove();

    const filteredRecipes = this.model.getRecipes();
    this.model.updateFiltersFromFilteredRecipes(filteredRecipes);

    this.updateView();
  }

  updateModelFromDropdown(selectedType, selectedValue) {
    this.model.setTags(selectedType, selectedValue);
    this.createTag(selectedType, selectedValue);

    const filteredRecipes = this.model.getRecipes();
    this.model.updateFiltersFromFilteredRecipes(filteredRecipes);

    this.updateView();
  }

  updateView() {
    const filteredRecipes = this.model.getRecipes();
    this.searchBarView.render(this.model);
    this.cardView.render(filteredRecipes);

    this.ingredientDropdownView.render(this.model);
    this.applianceDropdownView.render(this.model);
    this.ustensilsDropdownView.render(this.model);

    this.counterView.render(filteredRecipes.length);
  }
}

export default SearchController;
