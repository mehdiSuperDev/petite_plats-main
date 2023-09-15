class DropdownView {
  constructor() {
    this.filterContainer = document.getElementById("filter-container");
  }

  initEventListeners(updateModelCallback) {
    // Capturer les evenements du click sur le menu
    this.filterContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("dropdown-option")) {
        const type = e.target.dataset.type; // Ingrédients, Appareils, Ustensiles
        const value = e.target.textContent; // La valeur de l'option sélectionnée
        updateModelCallback("", { [type]: value });
      }
    });
  }

  render(filters) {
    //DEBUG
    console.log("filters", filters);

    //Mettre à jour les menus déroulants
    const ingredientOptions = filters.ingredient
      .map(
        (item) =>
          `<div class="dropdown-option" data-type="ingredient">${item}</div>`
      )
      .join("");
    const applianceOptions = filters.appliance
      .map(
        (item) =>
          `<div class="dropdown-option" data-type="appliance">${item}</div>`
      )
      .join("");
    const ustensilsOptions = filters.ustensils
      .map(
        (item) =>
          `<div class="dropdown-option" data-type="ustensils">${item}</div>`
      )
      .join("");

    this.filterContainer.innerHTML = `
        <div class="dropdown">
          <button class="dropdown-button">Ingrédients</button>
          <div class="dropdown-content">${ingredientOptions}</div>
        </div>
        <div class="dropdown">
          <button class="dropdown-button">Appareils</button>
          <div class="dropdown-content">${applianceOptions}</div>
        </div>
        <div class="dropdown">
          <button class="dropdown-button">Ustensiles</button>
          <div class="dropdown-content">${ustensilsOptions}</div>
        </div>
      `;
  }
}

export default DropdownView;
