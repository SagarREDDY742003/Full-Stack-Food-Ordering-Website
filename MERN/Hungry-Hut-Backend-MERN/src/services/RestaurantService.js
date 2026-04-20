import mongoose from "mongoose";
import Address from "../models/address.model.js";
import Restaurant from "../models/restaurant.model.js";

export const createRestaurant = async (req, user) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const address = await Address.create(
      [
        {
          streetAddress: req.address.streetAddress,
          city: req.address.city,
          state: req.address.state,
          country: req.address.country,
          postalCode: req.address.postalCode,
        },
      ],
      { session },
    );

    const restaurant = await Restaurant.create(
      [
        {
          owner: user,
          name: req.name,
          description: req.description,
          cuisineType: req.cuisineType,
          contactInformation: req.contactInformation,
          openingHours: req.openingHours,
          address: address[0]._id,
          images: req.images,
          registrationDate: req.registrationDate || Date.now(),
        },
      ],
      { session },
    );
    await session.commitTransaction(); // apply both
    session.endSession();
    return restaurant[0];
  } catch (error) {
    await session.abortTransaction(); //rollback both
    session.endSession();
    throw new Error(error.message);
  }
};

export const findRestaurantById = async (restaurantId) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) throw new Error("restaurant not found");
    return restaurant;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getRestaurantByUserId = async (userId) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: userId })
      .populate("owner")
      .populate("address");
    if (!restaurant) throw new Error("restaurant not found");
    return restaurant;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllRestaurants = async () => {
  try {
    return await Restaurant.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const searchRestaurant = async (keyword) => {
  try {
    const restaurants = await Restaurant.find({
      $or: [
        {name: { $regex: keyword, $options: "i" }},
        {description: { $regex: keyword, $options: "i" }},
      ],
    });
    return restaurants;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addToFavorites = async (restaurantId,user) => {
    try {
        const restaurant = await findRestaurantById(restaurantId);
        const dto={
            _id:restaurant._id,
            description:restaurant.description,
            images:restaurant.images,
            name:restaurant.name,
            open:restaurant.open,
        }
        const favorites = user.favorites || [];
        const index = favorites.findIndex(favorites => favorites._id.toString()===restaurantId.toString());
        if(index !== -1){
            favorites.splice(index,1);
        }
        else{
            favorites.push(dto);
        }
        user.favorites=favorites;
        await user.save();
        return dto;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateRestaurantStatus = async (id) => {
    try {
        const restaurant = await Restaurant.findById(id).populate("owner").populate("address");
        restaurant.open=!restaurant.open;
        await restaurant.save();
        return restaurant;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateRestaurant = async (restaurantId, updatedRestaurant) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    if (updatedRestaurant.cuisineType) {
      restaurant.cuisineType = updatedRestaurant.cuisineType;
    }
    if (updatedRestaurant.description) {
      restaurant.description = updatedRestaurant.description;
    }
    if (updatedRestaurant.name) {
      restaurant.name = updatedRestaurant.name;
    }
    if (updatedRestaurant.contactInformation) {
      restaurant.contactInformation = updatedRestaurant.contactInformation;
    }
    if (updatedRestaurant.images) {
      restaurant.images = updatedRestaurant.images;
    }
    if (updatedRestaurant.address) {
      restaurant.address = updatedRestaurant.address;
    }
    if (updatedRestaurant.openingHours) {
      restaurant.openingHours = updatedRestaurant.openingHours;
    }
    const savedRestaurant = await restaurant.save();
    return savedRestaurant;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteRestaurant = async (restaurantId) => {
  try {
    const restaurant = await findRestaurantById(restaurantId);
    await Restaurant.findByIdAndDelete(restaurantId);

  } catch (error) {
    throw new Error(error.message);
  }
};