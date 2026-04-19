import { createCategory, findCategoryByRestaurantId } from "../services/categoryService.js";


export async function createCategoryController(req, res) {
  try {
    const category = req.body;
    const user = req.user;
    const createdCategory = await createCategory(category.name,user._id);
    res.status(200).json(createdCategory);
  } catch (error) {
    if (error instanceof Error) 
        res.status(400).json({ error: error.message });
    else 
        res.status(500).json({ error: "internal server error" });
  }
}

export async function getRestaurantsCategoryController(req, res) {
  try {
    const {id} = req.params;
    const categories = await findCategoryByRestaurantId(id);
    res.status(200).json(categories);
  } catch (error) {
    if (error instanceof Error) 
        res.status(400).json({ error: error.message });
    else 
        res.status(500).json({ error: "internal server error" });
  }
}