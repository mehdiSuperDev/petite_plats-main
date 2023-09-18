import CardView from "../views/CardView";
import SearchBarView from "../views/searchBarView";
import DropdownView from "../views/DropdownView";

class SearchController {
  constructor(model, recipeService) {
    this.model = model;
    this.recipeService = recipeService;

    this.searchBarView = new SearchBarView();
    this.cardView = new CardView();

    this.ingredientDropdownView = new DropdownView("ingredient");
    this.applianceDropdownView = new DropdownView("appliance");
    this.ustensilsDropdownView = new DropdownView("ustensils");
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

    this.updateView();
  }

  updateModelFromSearchBar(searchText, filters) {
    const result = this.recipeService.search(searchText, filters);
    if (searchText.length >= 3) {
      this.model.setRecipes(result.recipes);
      this.model.setFilters(result.filters);
    } else {
      this.model.setRecipes([]);
      this.model.setFilters({ ingredient: [], appliance: [], ustensils: [] });
    }
    this.model.setSearchText(searchText);
    this.updateView();
  }

  updateModelFromDropdown(selectedType, selectedValue) {
    this.model.setTags(selectedType, selectedValue);
    this.updateView();
  }

  updateView() {
    const filteredRecipes = this.model.getRecipes();

    console.log("filteredRecipes", filteredRecipes);

    this.searchBarView.render(this.model);
    this.cardView.render(filteredRecipes);

    this.ingredientDropdownView.render(this.model);
    this.applianceDropdownView.render(this.model);
    this.ustensilsDropdownView.render(this.model);
  }
}

export default SearchController;
