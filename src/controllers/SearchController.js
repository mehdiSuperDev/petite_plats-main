import CardView from "../views/CardView";
import SearchBarView from "../views/searchBarView";
import DropdownView from "../views/DropdownView";

class SearchController {
  constructor(model, recipeService) {
    this.model = model;
    this.recipeService = recipeService;

    this.searchBarView = new SearchBarView();
    this.cardView = new CardView();
    this.dropdownView = new DropdownView();
  }

  init() {
    this.searchBarView.initEventListeners(this.updateModel.bind(this));
    this.dropdownView.initEventListeners(this.updateModel.bind(this));
    this.updateView();
  }

  // Callback
  updateModel(searchText, filters) {
    const result = this.recipeService.search(searchText, filters);
    console.log("result", result);

    if (searchText.length >= 3) {
      this.model.setRecipes(result.recipes);
      this.model.setFilters(result.filters);
    }
    this.model.setSearchText(searchText);

    // Debug
    console.log(`$$$ model.recipes ${this.model.recipes}`);
    console.log(`$$$ model.filters ${this.model.filters}`);

    this.updateView();
  }

  updateView() {
    this.searchBarView.render(this.model);
    this.cardView.render(this.model.getRecipes());
    this.dropdownView.render(this.model.filters);
  }
}

export default SearchController;
