class RecipeService {
  recettesTotal = [];

  constructor() {
    this.recettesTotal = recipes;
  }

  /*

  INPUT: 
    motRecerche = "coco",
    filtre = { ustensils: ["Cuillère en bois", "louche", "couteau"],        ingredient: ["Viande hachée 1% de matière grasse","Chocolat noir"],     appliance: ["Casserole"]}


    OUTPUT 
    {
        recipe : [
            {
                id: 21,
                image: "Recette21.jpg",
                name: "Spaghettis à la bolognaise",
                ...
            },
            {
                id: 22,
                ...
            },
        ],
        filtres:{ 
            ustensils: [
                "Cuillère en bois", 
                "louche", 
                "couteau"
            ],
            ingredient: [
                "Viande hachée 1% de matière grasse",
                "Chocolat noir"
            ],     
            appliance: [
                "Casserole"
            ]
        }
    }
    */

  search(motRecherche, filtresSelectionne) {
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
      recettes: resultat,
      filtres: {
        ustensils: Array.from(ustensilsSet),
        ingredient: Array.from(ingredientsSet),
        appliance: Array.from(appliancesSet),
      },
    };
  }
}

const recipe = RecipeService();
