import express from "express";
import verifyRole from "../middleware/verifyRole.js";
import rolesList from "../config/roles_list.js";
import {
  getTaskFollowUp,
  getTasks,
  sendMessage,
} from "../controllers/task.Controller.js";

const taskRouter = express.Router();

taskRouter.get(
  "/get-tasks/:officeId",
  verifyRole(rolesList.president, rolesList.vp, rolesList.cos, rolesList.staff),
  getTasks
);

taskRouter.get(
  "/get-task-follow-up/:caseId/:officeId",
  verifyRole(rolesList.president, rolesList.vp, rolesList.cos, rolesList.staff),
  getTaskFollowUp
);

taskRouter.post(
  "/send-follow-up-message",
  verifyRole(rolesList.president, rolesList.vp, rolesList.cos, rolesList.staff),
  sendMessage
);

// caseRouter.get(
//   "/get-case/:id",
//   verifyRole(rolesList.president, rolesList.vp, rolesList.cos, rolesList.staff),
//   getTaskById
// );

export default taskRouter;
