import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongodbUrl = process.env.MONGODB_URL;

export async function connectDb() {
  try {
    await mongoose.connect(mongodbUrl);
  } catch (error) {
    throw error;
  }
}