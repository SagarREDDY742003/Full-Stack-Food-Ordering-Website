import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import homeRouter from "./routers/homeRoutes.js";
import authRouters from "./routers/authRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Home routes
app.use("/", homeRouter);

// Auth routes
app.use("/auth", authRouters);

export default app;