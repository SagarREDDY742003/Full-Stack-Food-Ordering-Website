import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: String,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
