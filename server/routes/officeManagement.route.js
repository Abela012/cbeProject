import express from "express";
import verifyRole from "../middleware/verifyRole.js";
import rolesList from "../config/roles_list.js";
import {
  createOffice,
  deleteOffice,
  getOffice,
  getOffices,
  updateOffice,
} from "../controllers/officeManagement.Controller.js";

const officeManagementRouter = express.Router();

officeManagementRouter.get("/get-offices", getOffices);
officeManagementRouter.get("/get-office/:id", getOffice);
officeManagementRouter.post(
  "/create-office",
  verifyRole(rolesList.admin),
  createOffice
);
officeManagementRouter.patch(
  "/update-office/:id",
  verifyRole(rolesList.admin),
  updateOffice
);
officeManagementRouter.delete(
  "/delete-office/:id",
  verifyRole(rolesList.admin),
  deleteOffice
);

export default officeManagementRouter;
