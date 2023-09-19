import { recipes } from "../models/Recipes";

class RecipeService {
  allRecipes = [];

  constructor() {
    this.allRecipes = recipes;
  }

  search(query) {
    let result = this.allRecipes.filter((recipe) => {
      // Recherche dans le titre de la recette
      const nameMatch = recipe.name.toLowerCase().includes(query.toLowerCase());

      // Recherche dans la description de la recette
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(query.toLowerCase());

      // Recherche dans la liste des ingrédients de la recette
      const ingredientMatch = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
      );

      return nameMatch || descriptionMatch || ingredientMatch;
    });

    const ingredientsSet = new Set();
    const appliancesSet = new Set();
    const ustensilsSet = new Set();

    result.forEach((recipe) => {
      appliancesSet.add(recipe.appliance.toLowerCase());

      recipe.ingredients.forEach((ingredient) => {
        ingredientsSet.add(ingredient.ingredient.toLowerCase());
      });

      recipe.ustensils.forEach((ustensil) => {
        ustensilsSet.add(ustensil.toLowerCase());
      });
    });

    return {
      recipes: !query ? this.allRecipes : result,
      filters: {
        ustensils: Array.from(ustensilsSet),
        ingredient: Array.from(ingredientsSet),
        appliance: Array.from(appliancesSet),
      },
    };
  }
}

export default RecipeService;
