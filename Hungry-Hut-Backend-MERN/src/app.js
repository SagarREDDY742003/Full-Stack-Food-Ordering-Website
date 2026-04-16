import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import homeRouter from "./routers/homeRoutes.js"

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", homeRouter)

export default app;