class RecipeModel {
  constructor() {
    this.recipes = [];
    this.filters = { ingredient: [], appliance: [], ustensils: [] };
    this.searchText = "";
  }

  setRecipes(recipes) {
    this.recipes = recipes;
  }

  setFilters(filters) {
    this.filters = filters;
  }

  setSearchText(text) {
    this.searchText = text;
  }
}

export default RecipeModel;
