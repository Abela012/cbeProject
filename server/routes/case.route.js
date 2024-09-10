import express from "express";
import {
  assigneCase,
  createCase,
  deleteCase,
  getCaseById,
  getCases,
  updateCase,
  updateCaseStatus,
} from "../controllers/case.Controller.js";
import verifyRole from "../middleware/verifyRole.js";
import rolesList from "../config/roles_list.js";

const caseRouter = express.Router();

caseRouter.post(
  "/create-case",
  verifyRole(
    rolesList.secretary,
    rolesList.president,
    rolesList.vp,
    rolesList.cos
  ),
  createCase
);

caseRouter.get("/get-cases/:officeId", getCases);

caseRouter.get("/get-case/:id", getCaseById);

caseRouter.patch("/assigne-case/:caseId/:officeId", assigneCase);

caseRouter.patch("/update-case/:id", updateCase);

caseRouter.patch("/update-case-status/:id", updateCaseStatus);

caseRouter.delete("/delete-case/:id", deleteCase);

export default caseRouter;
