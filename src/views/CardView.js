class CardView {
  constructor() {
    // Le conteneur où les cartes seront injectées
    this.cardContainer = document.querySelector(".card-container");
  }

  // Méthode pour générer une seule carte
  generateCard(recipe) {
    return `
        <div class="card">
          <div class="card-image-container">
            <img src="./photos/${
              recipe.image
            }}" alt="Image" class="card-image" />
            <div class="timer">${recipe.time}min</div>
          </div>
          <div class="content">
            <h2 class="mb-4">${recipe.name}</h2>
            <h3>RECETTE</h3>
            <p class="card-description">${recipe.description}</p>
            <h3>INGREDIENTS</h3>
            <div class="card-elements">
              ${recipe.ingredients
                .map(
                  (ingredient) => `
                <div>
                  <span class="item-title">${ingredient.ingredient}</span>
                  <span class="item-detail">${ingredient.quantity}${
                    ingredient.unit || ""
                  }</span>
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

export default CardView;
