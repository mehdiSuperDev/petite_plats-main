class RecipeService {
  allRecipes = [];

  constructor() {
    this.allRecipes = recipes;
  }

  search(query) {
    let result = [];
    for (let i = 0; i < this.allRecipes.length; i++) {
      let recipe = this.allRecipes[i];

      const nameMatch =
        recipe.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;

      const descriptionMatch =
        recipe.description.toLowerCase().indexOf(query.toLowerCase()) !== -1;

      let ingredientMatch = false;
      for (let j = 0; j < recipe.ingredients.length; j++) {
        let ingredient = recipe.ingredients[j];
        if (
          ingredient.ingredient.toLowerCase().indexOf(query.toLowerCase()) !==
          -1
        ) {
          ingredientMatch = true;
          break;
        }
      }

      if (nameMatch || descriptionMatch || ingredientMatch) {
        result.push(recipe);
      }
    }

    return {
      recipes: !query ? this.allRecipes : result,
    };
  }
}
