import express from "express";
import verifyRole from "../middleware/verifyRole.js";
import rolesList from "../config/roles_list.js";
import {
  createSchedule,
  deleteSchedule,
  getSchedule,
  getScheduleList,
  updateSchedule,
} from "../controllers/scheduleList.Controller.js";

const scheduleListRoute = express.Router();

scheduleListRoute.post(
  "/creat-schedule",
  verifyRole(rolesList.president, rolesList.vp, rolesList.cos),
  createSchedule
);
scheduleListRoute.get(
  "/get-schedule-list/:officeId",
  verifyRole(rolesList.president, rolesList.vp, rolesList.cos),
  getScheduleList
);
scheduleListRoute.get(
  "/get-schedule/:id",
  verifyRole(rolesList.president, rolesList.vp, rolesList.cos),
  getSchedule
);
scheduleListRoute.patch(
  "/update-schedule/:scheduleId",
  verifyRole(rolesList.president, rolesList.vp, rolesList.cos),
  updateSchedule
);
scheduleListRoute.delete(
  "/delete-schedule/:id",
  verifyRole(rolesList.president, rolesList.vp, rolesList.cos),
  deleteSchedule
);

export default scheduleListRoute;
