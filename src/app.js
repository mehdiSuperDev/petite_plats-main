import "../public/styles.css";

import IndexController from "./controllers/IndexController";
// import RecipeModel from "./models/Recipes";

const controller = new IndexController();
console.log(controller.greet());
