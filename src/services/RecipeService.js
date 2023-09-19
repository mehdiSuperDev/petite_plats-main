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

    return {
      recipes: !query ? this.allRecipes : result,
    };
  }
}

export default RecipeService;
