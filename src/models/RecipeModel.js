class RecipeModel {
  constructor() {
    this.recipes = [];
    this.filters = { ingredient: [], appliance: [], ustensils: [] };
    this.tags = { ingredient: [], appliance: [], ustensils: [] };
    this.searchText = "";
  }

  updateFiltersFromFilteredRecipes(recipesToFilter = this.recipes) {
    let ingredientsSet = new Set();
    let appliancesSet = new Set();
    let ustensilsSet = new Set();

    recipesToFilter.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) =>
        ingredientsSet.add(ingredient.ingredient)
      );
      appliancesSet.add(recipe.appliance);
      recipe.ustensils.forEach((ustensil) => ustensilsSet.add(ustensil));
    });

    this.filters = {
      ingredient: Array.from(ingredientsSet),
      appliance: Array.from(appliancesSet),
      ustensils: Array.from(ustensilsSet),
    };
  }

  setRecipes(recipes) {
    this.recipes = recipes;
    this.updateFiltersFromFilteredRecipes();
  }

  getRecipes() {
    return this.recipes.filter((recipe) => {
      return ["ingredient", "appliance", "ustensils"].every((type) => {
        if (!this.tags[type].length) return true;

        switch (type) {
          case "ingredient":
            return this.tags[type].every((tag) =>
              recipe.ingredients.some((ingredient) =>
                ingredient.ingredient.includes(tag)
              )
            );
          case "appliance":
            return this.tags[type].includes(recipe.appliance);
          case "ustensils":
            return this.tags[type].every((tag) =>
              recipe.ustensils.includes(tag)
            );
        }
      });
    });
  }

  setTags(type, value) {
    if (this.tags[type] && !this.tags[type].includes(value)) {
      this.tags[type].push(value);
    }
    this.refreshFilters();
  }

  removeTag(type, value) {
    const index = this.tags[type]?.indexOf(value);
    if (index > -1) {
      this.tags[type].splice(index, 1);
    }
    this.refreshFilters();
  }

  refreshFilters() {
    const filteredRecipes = this.getRecipes();
    this.updateFiltersFromFilteredRecipes(filteredRecipes);
  }

  setSearchText(text) {
    this.searchText = text;
  }
}
