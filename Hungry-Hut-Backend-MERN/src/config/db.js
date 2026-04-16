import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongodbUrl = process.env.MONGODB_URL;

const connectDb = async() => {
  try {
    await mongoose.connect(mongodbUrl);
  } catch (error) {
    throw error;
  }
}

export default connectDb;