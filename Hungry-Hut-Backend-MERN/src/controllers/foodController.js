import { createFood, deleteFood, getRestaurantFood, searchFood, updateFoodAvailabilityStatus } from "../services/foodService.js";
import { findRestaurantById } from "../services/RestaurantService.js";


// admin
export const createFoodItem = async (req, res) => {
  try {
    const item = req.body;
    const user = req.user;
    const restaurant = await findRestaurantById(item.restaurantId);
    const foodItem = await createFood(item,restaurant);
    res.status(200).json(foodItem);
  } catch (error) {
    if(error instanceof Error)
        res.status(400).json({ error: error.message });
    else
        res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteFoodItem = async (req, res) => {
  try {
    const {id} = req.params;
    const user = req.user;
    await deleteFood(id);
    res.status(200).json({message:"Menu item deleted"});
  } catch (error) {
    if(error instanceof Error)
        res.status(400).json({ error: error.message });
    else
        res.status(500).json({ error: "Internal server error" });
  }
};

export const updateFoodAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await updateFoodAvailabilityStatus(id);
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// customer
export const getMenuItemsByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { isVegetarian, isNonVeg, isSeasonable, foodCategory } = req.query;
    const menuItems = await getRestaurantFood(
      restaurantId,
      isVegetarian,
      isNonVeg,
      isSeasonable,
      foodCategory,
    );
    res.status(200).json(menuItems);
  } catch (error) {
    if(error instanceof Error)
        res.status(400).json({ error: error.message });
    else
        res.status(500).json({ error: "Internal server error" });
  }
};

export const searchFoodController = async (req, res) => {
  try {
    const { name } = req.query;
    const menuItem = await searchFood(name);
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

