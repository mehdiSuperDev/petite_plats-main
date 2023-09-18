class RecipeModel {
  constructor() {
    this.recipes = [];
    this.filters = { ingredient: [], appliance: [], ustensils: [] };
    this.activeFilters = { ingredient: [], appliance: [], ustensils: [] };
    this.searchText = "";
  }

  getRecipes() {
    // toutes les recettes du modèle
    const allRecipes = [...this.recipes];

    // les filtres actifs du modèle
    const { ingredient, appliance, ustensils } = this.activeFilters;

    // Filtrer les recettes en fonction des filtres actifs
    const filteredRecipes = allRecipes.filter((recipe) => {
      const ingredientsMatch = ingredient.every((ing) =>
        recipe.ingredients.includes(ing)
      );
      const applianceMatch = appliance.every((app) => recipe.appliance === app);
      const ustensilsMatch = ustensils.every((ut) =>
        recipe.ustensils.includes(ut)
      );

      return ingredientsMatch && applianceMatch && ustensilsMatch;
    });

    return filteredRecipes;
  }

  setRecipes(recipes) {
    this.recipes = recipes;
  }

  setFilters(filters) {
    this.filters = filters;
  }

  setActiveFilters(type, value) {
    if (this.activeFilters[type]) {
      this.activeFilters[type].push(value);
    }
  }

  removeActiveFilter(type, value) {
    if (this.activeFilters[type]) {
      const index = this.activeFilters[type].indexOf(value);
      if (index > -1) {
        this.activeFilters[type].splice(index, 1);
      }
    }
  }

  getActiveFilters() {
    return this.activeFilters;
  }

  setSearchText(text) {
    this.searchText = text;
  }
}

export default RecipeModel;
