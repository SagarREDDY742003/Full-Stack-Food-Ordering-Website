import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    streetAddress:String,
    city:String,
    state:String,
    country:String,
    postalCode:String,
});

const Address = mongoose.model("Address",AddressSchema);

export default Address;