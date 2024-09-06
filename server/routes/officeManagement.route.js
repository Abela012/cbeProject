import express from "express";
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
officeManagementRouter.post("/create-office", createOffice);
officeManagementRouter.patch("/update-office/:id", updateOffice);
officeManagementRouter.delete("/delete-office/:id", deleteOffice);

export default officeManagementRouter;
