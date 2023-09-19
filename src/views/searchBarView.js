class SearchBarView {
  constructor() {
    // Références aux éléments du DOM
    this.searchBar = document.querySelector(".search-bar");
    this.searchInput = document.querySelector(".search-input");
    this.clearIcon = document.querySelector(".clear-icon");
    this.searchIcon = document.querySelector(".search-icon");
  }

  // Méthode pour initialiser les écouteurs d'événements
  initEventListeners(updateModelCallback) {
    this.searchInput.addEventListener("input", (e) => {
      updateModelCallback(e.target.value, {});
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
    } else {
      this.clearIcon.classList.remove("hidden");
    }
  }
}

export default SearchBarView;
