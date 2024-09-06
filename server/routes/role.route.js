import express from "express";
import {
  createRole,
  deleteRole,
  getRoles,
  getRole,
  updateRole,
} from "../controllers/role.Controller.js";

const roleRouter = express.Router();

roleRouter.get("/get-roles", getRoles);
roleRouter.get("/get-role/:id", getRole);
roleRouter.post("/create-role", createRole);
roleRouter.patch("/update-role/:id", updateRole);
roleRouter.delete("/delete-role/:id", deleteRole);

export default roleRouter;
