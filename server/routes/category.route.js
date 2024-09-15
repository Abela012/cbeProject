import express from "express";
import verifyRole from "../middleware/verifyRole.js";
import rolesList from "../config/roles_list.js";
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
categoryRouter.post(
  "/create-category",
  verifyRole(rolesList.admin),
  createCategory
);
categoryRouter.patch(
  "/update-category/:id",
  verifyRole(rolesList.admin),
  updateCategory
);
categoryRouter.delete(
  "/delete-category/:id",
  verifyRole(rolesList.admin),
  deleteCategory
);

export default categoryRouter;
