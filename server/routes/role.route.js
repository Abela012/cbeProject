import express from "express";
import verifyRole from "../middleware/verifyRole.js";
import rolesList from "../config/roles_list.js";
import {
  createRole,
  deleteRole,
  getRoles,
  getRole,
  updateRole,
} from "../controllers/role.Controller.js";

const roleRouter = express.Router();

roleRouter.get("/get-roles", verifyRole(rolesList.admin), getRoles);
roleRouter.get("/get-role/:id", verifyRole(rolesList.admin), getRole);
roleRouter.post("/create-role", verifyRole(rolesList.admin), createRole);
roleRouter.patch("/update-role/:id", verifyRole(rolesList.admin), updateRole);
roleRouter.delete("/delete-role/:id", verifyRole(rolesList.admin), deleteRole);

export default roleRouter;
