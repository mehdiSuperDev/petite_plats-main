class RecipeModel {
  constructor() {
    this.recipes = [];
    this.filters = { ingredient: [], appliance: [], ustensils: [] };
    this.tags = { ingredient: [], appliance: [], ustensils: [] };
    this.searchText = "";
    this.localFilters = { ingredient: [], appliance: [], utensils: [] };
  }

  setLocalFilters(filters) {
    this.localFilters = filters;
  }

  updateFiltersFromFilteredRecipes(filteredRecipes) {
    let updatedFilters = { ingredient: [], appliance: [], ustensils: [] };

    filteredRecipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (!updatedFilters.ingredient.includes(ingredient.ingredient)) {
          updatedFilters.ingredient.push(ingredient.ingredient);
        }
      });

      if (!updatedFilters.appliance.includes(recipe.appliance)) {
        updatedFilters.appliance.push(recipe.appliance);
      }

      recipe.ustensils.forEach((ustensil) => {
        if (!updatedFilters.ustensils.includes(ustensil)) {
          updatedFilters.ustensils.push(ustensil);
        }
      });
    });

    this.setFilters(updatedFilters);
  }

  // Mettre à jour les recettes dans le modèle et les filtres associés
  setRecipes(recipes) {
    this.recipes = recipes;
    this.updateFilters();
  }

  // Mettre à jour les filtres en fonction des recettes actuelles
  updateFilters() {
    const ingredientsSet = new Set();
    const appliancesSet = new Set();
    const ustensilsSet = new Set();

    this.recipes.forEach((recipe) => {
      appliancesSet.add(recipe.appliance);

      recipe.ingredients.forEach((ingredient) => {
        ingredientsSet.add(ingredient.ingredient);
      });

      recipe.ustensils.forEach((ustensil) => {
        ustensilsSet.add(ustensil);
      });
    });

    this.filters = {
      ustensils: Array.from(ustensilsSet),
      ingredient: Array.from(ingredientsSet),
      appliance: Array.from(appliancesSet),
    };
  }

  // Récupérer les recettes filtrées
  getRecipes() {
    const allRecipes = [...this.recipes];

    const { ingredient, appliance, ustensils } = this.tags;

    const filteredRecipes = allRecipes.filter((recipe) => {
      const ingredientsMatch =
        ingredient.length === 0 ||
        ingredient.every((ing) =>
          recipe.ingredients.some((rIng) => rIng.ingredient.includes(ing))
        );

      const applianceMatch =
        appliance.length === 0 || appliance.includes(recipe.appliance);

      const ustensilsMatch =
        ustensils.length === 0 ||
        ustensils.every((ut) => recipe.ustensils.includes(ut));

      return ingredientsMatch && applianceMatch && ustensilsMatch;
    });

    return filteredRecipes;
  }

  // Mettre à jour les filtres dans le modèle
  setFilters(filters) {
    this.filters = filters;
  }

  // Mettre à jour les tags actifs dans le modèle
  setTags(type, value) {
    if (this.tags[type]) {
      this.tags[type].push(value);
    }
    const filteredRecipes = this.getRecipes();
    this.updateFiltersFromFilteredRecipes(filteredRecipes);
  }

  removeTag(type, value) {
    if (this.tags[type]) {
      const index = this.tags[type].indexOf(value);
      if (index > -1) {
        this.tags[type].splice(index, 1);
      }
    }
    const filteredRecipes = this.getRecipes();
    this.updateFiltersFromFilteredRecipes(filteredRecipes);
  }

  // Récupérer les tags actifs
  getTags() {
    return this.tags;
  }

  // Mettre à jour le texte de recherche dans le modèle
  setSearchText(text) {
    this.searchText = text;
  }
}
