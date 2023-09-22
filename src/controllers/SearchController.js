class SearchController {
  constructor(model, recipeService) {
    this.model = model;
    this.recipeService = recipeService;

    this.searchBarView = new SearchBarView();
    this.cardView = new CardView();
    this.dropdownViews = {
      ingredient: new DropdownView("ingredient"),
      appliance: new DropdownView("appliance"),
      ustensils: new DropdownView("ustensils"),
    };
    this.counterView = new CounterView("1500");
  }

  init() {
    this.searchBarView.initEventListeners(
      this.updateModelFromSearchBar.bind(this)
    );

    for (let type in this.dropdownViews) {
      this.dropdownViews[type].initEventListeners(
        this.updateModelFromDropdown.bind(this)
      );
    }

    this.updateModelFromSearchBar("");
    this.updateView();
  }

  updateModelFromSearchBar(searchText) {
    const result = this.recipeService.search(
      searchText.length >= 3 ? searchText : ""
    );
    this.model.setRecipes(result.recipes);
    this.model.setSearchText(searchText);
    this.updateView();
  }

  createTag(type, value) {
    const tagHTML = `
      <div class="tag-view inline-flex items-center p-4 mb-4 m-1 rounded-xl h-[53px] backgroundColor-yellow color-black" data-type="${type}" data-value="${value}">
        <span class="tag-content pr-12">${value}</span>
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
    this.updateViewAfterTagChange();

    const tagContainer = document.querySelector(".tag-container");
    const tagToRemove = tagContainer.querySelector(
      `[data-type="${type}"][data-value="${value}"]`
    );
    tagToRemove.remove();
  }

  updateModelFromDropdown(selectedType, selectedValue) {
    this.model.setTags(selectedType, selectedValue);
    this.createTag(selectedType, selectedValue);
    this.updateViewAfterTagChange();
  }

  updateViewAfterTagChange() {
    const filteredRecipes = this.model.getRecipes();
    this.model.updateFiltersFromFilteredRecipes(filteredRecipes);
    this.updateView();
  }

  updateView() {
    const filteredRecipes = this.model.getRecipes();
    this.searchBarView.render(this.model);
    this.cardView.render(filteredRecipes);

    for (let type in this.dropdownViews) {
      this.dropdownViews[type].render(this.model);
    }

    this.counterView.render(filteredRecipes.length);
  }
}
