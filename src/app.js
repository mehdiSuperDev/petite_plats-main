const model = new RecipeModel();
const recipeService = new RecipeService();
const controller = new SearchController(model, recipeService);

controller.init();
