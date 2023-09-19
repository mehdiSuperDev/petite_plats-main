class RecipeModel {
  constructor() {
    this.recipes = [];
    this.filters = { ingredient: [], appliance: [], ustensils: [] };
    this.tags = { ingredient: [], appliance: [], ustensils: [] };
    this.searchText = "";
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
    console.log("Filtres après mise à jour:", this.filters);
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

  // Mettre à jour les recettes dans le modèle
  // setRecipes(recipes) {
  //   this.recipes = recipes;
  // }

  // Mettre à jour les filtres dans le modèle
  setFilters(filters) {
    this.filters = filters;
  }

  // Mettre à jour les tags actifs dans le modèle
  setTags(type, value) {
    if (this.tags[type]) {
      this.tags[type].push(value);
    }
    console.log("Tags après ajout:", this.tags);
  }

  // Supprimer un tag actif du modèle
  removeTag(type, value) {
    if (this.tags[type]) {
      const index = this.tags[type].indexOf(value);
      if (index > -1) {
        this.tags[type].splice(index, 1);
      }
    }
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

export default RecipeModel;
