import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { addToFavoritesController, createRestaurantController, deleteRestaurantController, findRestaurantByIdController, findRestaurantByUserIdController, getAllRestaurantsController, searchRestaurantController, updateRestaurantStatusController } from "../controllers/restaurantController.js";

const restaurantRoutes = Router();

// Admin Routes
// create restaurant
restaurantRoutes.post("/admin/restaurant",authenticate,createRestaurantController);
// delete restaurant
restaurantRoutes.delete("/admin/restaurant/:id",authenticate,deleteRestaurantController)
// update restaurant status
restaurantRoutes.put("/admin/restaurant/:id/status", updateRestaurantStatusController);
// find restaurant by userId
restaurantRoutes.get("/admin/restaurant/user",authenticate,findRestaurantByUserIdController);

// Customer Routes
// get all restaurants
restaurantRoutes.get("/restaurants",getAllRestaurantsController);
// find restaurant by id 
restaurantRoutes.get("/restaurants/:id",findRestaurantByIdController);
// add restaurant to favorites
restaurantRoutes.put("/restaurants/:id/add-favorites",authenticate, addToFavoritesController);
// search restaurant
restaurantRoutes.put("/restaurants/search", searchRestaurantController);
export default restaurantRoutes;