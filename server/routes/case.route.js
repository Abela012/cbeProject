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

caseRouter.get(
  "/get-cases/:officeId",
  verifyRole(rolesList.president, rolesList.vp, rolesList.cos),
  getCases
);

caseRouter.get(
  "/get-case/:id",
  verifyRole(rolesList.president, rolesList.vp, rolesList.cos, rolesList.staff),
  getCaseById
);

caseRouter.patch(
  "/assigne-case/:caseId/:officeId",
  verifyRole(rolesList.president, rolesList.vp, rolesList.cos),
  assigneCase
);

caseRouter.patch(
  "/update-case/:id",
  verifyRole(rolesList.president, rolesList.vp, rolesList.cos),
  updateCase
);

caseRouter.patch(
  "/update-case-status/:id",
  verifyRole(rolesList.president, rolesList.vp, rolesList.cos),
  updateCaseStatus
);

caseRouter.delete(
  "/delete-case/:id",
  verifyRole(
    rolesList.secretary,
    rolesList.president,
    rolesList.vp,
    rolesList.cos
  ),
  deleteCase
);

export default caseRouter;
