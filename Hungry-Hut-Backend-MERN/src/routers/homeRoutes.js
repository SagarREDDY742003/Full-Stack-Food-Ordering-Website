import { Router } from "express";

const homeRouter = Router();

homeRouter.get("/", async (req, res) => {
    res.status(200).send({ message: "Welcome to online food ordering website" });
});

export default router;