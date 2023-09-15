class RecipeModel {
  constructor() {
    this.recipes = [];
    this.filters = { ingredient: [], appliance: [], ustensils: [] };
    this.searchText = "";
    this.activeFilters = { ingredient: [], appliance: [], ustensils: [] };
  }

  getRecipes() {
    return this.recipes;
  }

  setRecipes(recipes) {
    this.recipes = recipes;
  }

  getFilters() {
    return this.filters;
  }

  setFilters(filters) {
    this.filters = filters;
  }

  setSearchText(text) {
    this.searchText = text;
  }

  setActiveFilters(type, value) {
    this.activeFilters[type].push(value);
  }
}

export default RecipeModel;
