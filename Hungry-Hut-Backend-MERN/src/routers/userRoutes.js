import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { getUsersProfile } from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.get("/profile",authenticate,getUsersProfile);

export default userRoutes;