class CardView {
  constructor() {
    // Le conteneur où les cartes seront injectées
    this.cardContainer = document.querySelector(".card-container");
  }

  // Méthode pour générer une seule carte
  generateCard(recipe) {
    return `
        <div class="card max-w-sm shadow-xl rounded-2xl">
          <div class="card-image-container  relative mb-4">
          <img src="./public/images/${
            recipe.image
          }" alt="Image" class="card-image" />
            <div class="timer rounded-md absolute top-4 right-4 p-1 text-[12px] font-custom-manrope backgroundColor-yellow">${
              recipe.time
            }min</div>
          </div>
          <div class="content flex flex-col gap-4 p-4">
            <h2 class="mb-4">${recipe.name}</h2>
            <h3>RECETTE</h3>
            <p class="card-description text-base">${recipe.description}</p>
            <h3>INGREDIENTS</h3>
            <div class="card-elements grid grid-cols-2 gap-4 p-4">
              ${recipe.ingredients
                .map(
                  (ingredient) => `
                <div>
                  <span class="item-title  block color-black">${
                    ingredient.ingredient
                  }</span>
                  <span class="item-detail block color-grey">${
                    ingredient.quantity
                  }${ingredient.unit || ""}</span>
                </div>`
                )
                .join("")}
            </div>
          </div>
        </div>
      `;
  }

  // Méthode pour mettre à jour la vue
  render(recipes) {
    const cardsHTML = recipes.map(this.generateCard).join("");
    this.cardContainer.innerHTML = cardsHTML;
  }
}
