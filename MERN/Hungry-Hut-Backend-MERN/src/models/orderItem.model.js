import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
    food:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food",
    },
    quantity:Number,
    totalPrice:Number,
    ingredients:[String],
});

const OrderItem = mongoose.model("OrderItem",OrderItemSchema);
export default OrderItem;