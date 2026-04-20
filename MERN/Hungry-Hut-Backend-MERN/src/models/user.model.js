import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["ROLE_CUSTOMER", "ROLE_RESTAURANT_OWNER", "ROLE_ADMIN"],
    default: "ROLE_CUSTOMER",
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  favorites: [
    {
      name: String,
      description: String,
      images: [String], // better to define type for array elements
      open:Boolean,
    },
  ],
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
});

const User = mongoose.model("User", UserSchema);

export default User;
