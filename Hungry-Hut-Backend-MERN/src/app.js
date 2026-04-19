import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import homeRouter from "./routers/homeRoutes.js";
import authRouters from "./routers/authRoutes.js";
import restaurantRoutes from "./routers/restaurantRoutes.js";
import userRoutes from "./routers/userRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Home routes
app.use("/", homeRouter);

// Auth routes
app.use("/auth", authRouters);

// User routes
app.use("/api/users",userRoutes);

// restaurant routes
app.use("/api", restaurantRoutes);

export default app;