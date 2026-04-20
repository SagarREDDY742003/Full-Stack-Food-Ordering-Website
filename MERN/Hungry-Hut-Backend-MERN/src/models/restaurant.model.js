import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  description: String,
  cuisineType: String,
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  contactInformation: {},
  openingHours: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  numRating: Number,
  images: [String],
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  open:{
    type:Boolean,
    default:true,
  },
  foods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;
