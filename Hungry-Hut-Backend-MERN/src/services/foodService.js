import Food from "../models/food.model.js";
import Restaurant from "../models/restaurant.model.js";

export const createFood = async (req, restaurant) => {
  try {
    const food = await Food.create({
      name: req.name,
      description: req.description,
      price: req.price,
      foodCategory: req.category,
      images: req.images,
      restaurant: restaurant._id,
      isVegetarian: req.isVegetarian,
      isSeasonable: req.isSeasonable,
      ingredients: req.ingredients,
      creationDate: new Date(),
    });
    restaurant.foods.push(food._id);
    await restaurant.save();
    return food;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteFood = async (foodId) => {
  try {
    const food = await Food.findById(foodId);
    if(!food) throw new Error('Food not found');
    // remove food reference from restaurant
    if(food.restaurant){
        const restaurant = await Restaurant.findById(food.restaurant);
        if(restaurant){
            restaurant.foods = restaurant.foods.filter(
                (id) => id.toString() !== foodId.toString()
            );
            await restaurant.save();
        }
    }
    // delete the food itself
    await Food.findByIdAndDelete(foodId);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getRestaurantFood = async (
  restaurantId,
  isVegetarian,
  isNonVeg,
  isSeasonable,
  foodCategory,
) => {
  try {
    let query = {restaurant: restaurantId};
    if(isVegetarian=="true") query.isVegetarian=true;
    if(isNonVeg=="true") query.isVegetarian=false;
    if(isSeasonable=="true") query.isSeasonable=true;
    if(foodCategory) query.foodCategory=foodCategory;

    const foods = await Food.find(query).populate([
        {path: "ingredients",populate:{path:"category",select:"name"}},
        "foodCategory",
        {path:"restaurant",select:"name _id"},
    ]);
    return foods;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchFood = async(keyword) =>{
    try {
        let query = {};
        if(keyword){
            query.$or=[
                {name:{$regex:keyword,$options:"i"}},
                {"foodCategory.name":{$regex:keyword,$options:"i"}},
            ];
        }
        const foods = await Food.fond(query);
        return foods;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const findFoodById = async (foodId) => {
  try {
    const food = await Food.findById(foodId);
    if(!food) throw new Error('Food not found');
    return food;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateFoodAvailabilityStatus = async (foodId) => {
  try {
    const food = (await findFoodById(foodId)).populate([
        {path:"ingredients",populate:{path:"category",select:"name"}},
        "foodCategory",
        {path:"restaurant",select:"name _id"},
    ]);
    if(!food) throw new Error("Food not found");
    food.available=!food.available;
    await food.save();
    return food;
  } catch (error) {
    throw new Error('Failed to update avaliability status for food');
  }
};
