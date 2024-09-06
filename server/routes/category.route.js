import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.Controller.js";

const categoryRouter = express.Router();

categoryRouter.get("/get-categories", getCategories);
categoryRouter.get("/get-category/:id", getCategory);
categoryRouter.post("/create-category", createCategory);
categoryRouter.patch("/update-category/:id", updateCategory);
categoryRouter.delete("/delete-category/:id", deleteCategory);

export default categoryRouter;
