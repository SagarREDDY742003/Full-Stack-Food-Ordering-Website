import { Router } from "express";
import { createIngredient, createIngredientCategory, getRestaurantsIngredientCategories, getRestaurantsIngredients, updateStock } from "../controllers/IngredientController.js";
import { authenticate } from "../middleware/authenticate.js";

const ingredientRoutes = Router();

// create ingredient Category
ingredientRoutes.post('/category',authenticate,createIngredientCategory);
// create Ingredient Item
ingredientRoutes.post('/ingredientItem',authenticate,createIngredient);
//update Ingredient Stock
ingredientRoutes.put('/:id/stock',authenticate,updateStock);
// get Restaurant Ingredients
ingredientRoutes.get('/restaurant/:id',authenticate,getRestaurantsIngredients);
// get Restaurant Ingredient Category
ingredientRoutes.get('/restaurant/:id/category',authenticate,getRestaurantsIngredientCategories);

export default ingredientRoutes;