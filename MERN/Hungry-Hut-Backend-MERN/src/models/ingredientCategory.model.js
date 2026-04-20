import mongoose from "mongoose";

const IngredientCategorySchema = new mongoose.Schema({
  name: String,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IngredientsItem",
    },
  ],
});

const IngredientCategory = mongoose.model("IngredientCategory",IngredientCategorySchema);
export default IngredientCategory;