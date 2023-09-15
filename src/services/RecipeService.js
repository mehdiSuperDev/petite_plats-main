import { recipes } from "../models/Recipes";

class RecipeService {
  recettesTotal = [];

  constructor() {
    this.recettesTotal = recipes;
  }

  search(motRecherche) {
    let resultat = this.recettesTotal.filter((recette) =>
      recette.description.includes(motRecherche)
    );

    const ingredientsSet = new Set();
    const appliancesSet = new Set();
    const ustensilsSet = new Set();

    resultat.forEach((recette) => {
      appliancesSet.add(recette.appliance);

      recette.ingredients.forEach((ingredient) => {
        ingredientsSet.add(ingredient.ingredient);
      });

      recette.ustensils.forEach((ustensil) => {
        ustensilsSet.add(ustensil);
      });
    });

    return {
      recipes: resultat,
      filters: {
        ustensils: Array.from(ustensilsSet),
        ingredient: Array.from(ingredientsSet),
        appliance: Array.from(appliancesSet),
      },
    };
  }
}

export default RecipeService;
