import { recipes } from "../models/Recipes";

class RecipeService {
  allRecipes = [];

  constructor() {
    this.allRecipes = recipes;
  }

  search(query) {
    let result = this.allRecipes.filter((recipe) =>
      recipe.description.includes(query)
    );

    const ingredientsSet = new Set();
    const appliancesSet = new Set();
    const ustensilsSet = new Set();

    result.forEach((recipe) => {
      appliancesSet.add(recipe.appliance);

      recipe.ingredients.forEach((ingredient) => {
        ingredientsSet.add(ingredient.ingredient);
      });

      recipe.ustensils.forEach((ustensil) => {
        ustensilsSet.add(ustensil);
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
