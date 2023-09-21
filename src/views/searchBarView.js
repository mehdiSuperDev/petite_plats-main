import { escapeHTML } from "../helpers/utils";

class SearchBarView {
  constructor() {
    // Références aux éléments du DOM
    this.searchBar = document.querySelector(".search-bar");
    this.searchInput = document.querySelector(".search-input");
    this.clearIcon = document.querySelector(".clear-icon");
    this.searchIcon = document.querySelector(".search-icon");
    this.errorText = document.querySelector(".search-bar-error");
  }

  // Méthode pour initialiser les écouteurs d'événements
  initEventListeners(updateModelCallback) {
    this.searchInput.addEventListener("input", (e) => {
      const safeValue = escapeHTML(e.target.value);
      updateModelCallback(safeValue, {});
    });

    this.clearIcon.addEventListener("click", () => {
      this.searchInput.value = "";
      updateModelCallback("", {});
    });

    this.searchIcon.addEventListener("click", () => {
      console.log("clicked");
    });
  }

  // Méthode pour mettre à jour la vue
  render(model) {
    if (model.searchText.length == 0) {
      this.clearIcon.classList.add("hidden");
      this.errorText.classList.add("hidden");
    } else {
      this.clearIcon.classList.remove("hidden");

      // Gestion du message d'erreur
      const filteredRecipes = model.getRecipes();
      if (filteredRecipes.length === 0) {
        this.errorText.classList.remove("hidden");
        this.errorText.textContent = `Aucune recette ne contient ‘${model.searchText}’ vous pouvez chercher « tarte aux pommes », « poisson », etc...`;
      } else {
        this.errorText.classList.add("hidden");
      }
    }
  }
}

export default SearchBarView;
