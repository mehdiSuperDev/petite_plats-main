import "../public/styles.css";
import RecipeModel from "./models/RecipeModel";
import RecipeService from "./services/RecipeService";
import SearchController from "./controllers/SearchController";

const model = new RecipeModel();
const recipeService = new RecipeService();
const controller = new SearchController(model, recipeService);

controller.init();

// import IndexController from "./controllers/IndexController";
// import RecipeModel from "./models/Recipes";

// const controller = new IndexController();
// console.log(controller.greet());

// SearchBar Test
// document.addEventListener("DOMContentLoaded", function () {
//   const searchInput = document.querySelector(".search-input");
//   const clearIcon = document.querySelector(".clear-icon");

//   // Afficher l'icône "clear" lorsque du texte est entré
//   searchInput.addEventListener("input", function () {
//     if (this.value) {
//       clearIcon.classList.remove("hidden");
//     } else {
//       clearIcon.classList.add("hidden");
//     }
//   });

//   // Effacer le texte de recherche lorsque l'icône "clear" est cliquée
//   clearIcon.addEventListener("click", function () {
//     searchInput.value = "";
//     clearIcon.classList.add("hidden");
//   });
// });
