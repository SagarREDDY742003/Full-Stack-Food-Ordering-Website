import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import homeRouter from "./routers/homeRoutes.js";
import authRouters from "./routers/authRoutes.js";
import restaurantRoutes from "./routers/restaurantRoutes.js";
import userRoutes from "./routers/userRoutes.js";
import orderRoutes from "./routers/orderRoutes.js";
import foodRouter from "./routers/foodRoutes.js";
import eventRoutes from "./routers/eventRoutes.js";
import cartRoutes from "./routers/cartRoutes.js";
import categoryRoutes from "./routers/categoryRoutes.js";
import ingredientRoutes from "./routers/ingredientRoutes.js";

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

// order routes
app.use("/api", orderRoutes);

// food routes
app.use("/api", foodRouter);

// event routes
app.use("/api", eventRoutes);

// cart routes
app.use("/api", cartRoutes);

// category routes
app.use("/api", categoryRoutes);

// ingredient routes
app.use("/api/admin/ingredients", ingredientRoutes);

export default app;