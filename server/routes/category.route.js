import express from "express";
import { getCategories } from "../controllers/category.Controller.js";

const categoryRouter = express.Router();

categoryRouter.get("/get-categories", getCategories);

export default categoryRouter;
