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
    this.searchBarView.initEventListeners(
      this.updateModelFromSearchBar.bind(this)
    );
    this.dropdownView.initEventListeners(
      this.updateModelFromDropdown.bind(this)
    );
    this.updateView();
  }

  // Callback pour la searchBar
  updateModelFromSearchBar(searchText, filters) {
    const result = this.recipeService.search(searchText, filters);
    console.log("result", JSON.stringify(result));

    if (searchText.length >= 3) {
      this.model.setRecipes(result.recipes);
      this.model.setFilters(result.filters);
    } else {
      // Réinitialisez modèle si moins de 3 caractères
      this.model.setRecipes([]);
      this.model.setFilters({ ingredient: [], appliance: [], ustensils: [] });
    }
    this.model.setSearchText(searchText);

    // Debug
    console.log(`$$$ model.recipes ${this.model.recipes}`);
    console.log(`$$$ model.filters ${this.model.filters}`);

    this.updateView();
  }

  // Callback pour le menu déroulant
  updateModelFromDropdown(selectedOption) {
    console.log("%%% OPTION Selected", selectedOption);

    this.updateView();
  }

  updateView() {
    this.searchBarView.render(this.model);
    this.cardView.render(this.model.getRecipes());
    this.dropdownView.render(this.model);
  }
}

export default SearchController;
