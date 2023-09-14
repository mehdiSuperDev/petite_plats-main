import IndexController from "./controllers/IndexController";
import RecipeModel from "./models/Recipe";

const controller = IndexController();
console.log(controller.greet());
