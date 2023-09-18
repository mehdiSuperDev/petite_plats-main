import CardView from "../views/CardView";
import SearchBarView from "../views/searchBarView";
import DropdownView from "../views/DropdownView";

class SearchController {
  constructor(model, recipeService) {
    this.model = model;
    this.recipeService = recipeService;

    this.searchBarView = new SearchBarView();
    this.cardView = new CardView();
    this.dropdownView = new DropdownView("Ingredients");
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
  updateModelFromDropdown(selectedType, selectedValue) {
    this.model.setActiveFilters(selectedType, selectedValue);
    console.log("%%%-1 SelectedType: ", selectedType);
    console.log("%%%-2 SelectedValue: ", selectedValue);

    // this.model.setActiveFilters(selectedFilters);
    // console.log("%%% OPTION Selected", selectedFilters);

    this.updateView();
  }

  updateView() {
    const filteredRecipes = this.model.getRecipes();

    this.searchBarView.render(this.model);
    this.cardView.render(filteredRecipes);
    this.dropdownView.render(this.model);
  }
}

export default SearchController;
