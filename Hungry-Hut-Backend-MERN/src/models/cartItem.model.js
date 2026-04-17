import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
  },
  quantity: Number,
  ingredients: [String],
  totalPrice: Number,
});

const CartItem = mongoose.model("CartItem", CartItemSchema);
export default CartItem;
