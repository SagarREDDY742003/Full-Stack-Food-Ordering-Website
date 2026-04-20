import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { createCategoryController, getRestaurantsCategoryController } from "../controllers/categoryController.js";

const categoryRoutes = Router();

// create category
categoryRoutes.post('/admin/category',authenticate,createCategoryController);
// get restaurant category
categoryRoutes.get('/category/restaurant/:id',getRestaurantsCategoryController);

export default categoryRoutes;