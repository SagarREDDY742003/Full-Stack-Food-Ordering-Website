import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  total: Number,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartItem",
    },
  ],
});

const Cart = mongoose.model("Cart",CartSchema);
export default Cart;
