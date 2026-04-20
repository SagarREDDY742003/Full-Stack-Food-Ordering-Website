import { Router } from "express";
import { login, register } from "../controllers/authController.js";

const authRouters = Router();

// Register route
authRouters.post("/signup", register);

// Login route
authRouters.post("/signin", login);

export default authRouters;
