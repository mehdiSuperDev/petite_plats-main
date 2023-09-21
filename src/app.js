// import "../public/styles.css";
// import RecipeModel from "./models/RecipeModel";
// import RecipeService from "./services/RecipeService";
// import SearchController from "./controllers/SearchController";

const model = new RecipeModel();
const recipeService = new RecipeService();
const controller = new SearchController(model, recipeService);

controller.init();
