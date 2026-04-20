import {
  addToFavorites,
  createRestaurant,
  deleteRestaurant,
  findRestaurantById,
  getAllRestaurants,
  getRestaurantByUserId,
  searchRestaurant,
  updateRestaurantStatus,
} from "../services/RestaurantService.js";

export const createRestaurantController = async (req, res) => {
  try {
    const user = req.user;
    const restaurant = await createRestaurant(req.body, user);
    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRestaurantController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    await deleteRestaurant(id);
    res.status(200).json({
      message: "Restaurant deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRestaurantStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await updateRestaurantStatus(id);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const findRestaurantByUserIdController = async (req, res) => {
  try {
    const user = req.user;
    const restaurant = await getRestaurantByUserId(user._id);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const searchRestaurantController = async (req, res) => {
  try {
    const { keyword } = req.query;
    const restaurant = await searchRestaurant(keyword);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllRestaurantsController = async (req, res) => {
  try {
    const restaurants = await getAllRestaurants();
    res.status(201).json(restaurants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const findRestaurantByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await findRestaurantById(id);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const addToFavoritesController = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await addToFavorites(id, req.user);
    res.status(200).json({ message: "Favorites updated", restaurant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
