import express from "express";
import {
  createSchedule,
  deleteSchedule,
  getSchedule,
  getScheduleList,
  updateSchedule,
} from "../controllers/scheduleList.Controller.js";

const scheduleListRoute = express.Router();

scheduleListRoute.post("/creat-schedule", createSchedule);
scheduleListRoute.get("/get-schedule-list/:officeId", getScheduleList);
scheduleListRoute.get("/get-schedule/:id", getSchedule);
scheduleListRoute.patch("/update-schedule/:id", updateSchedule);
scheduleListRoute.delete("/delete-schedule/:id", deleteSchedule);

export default scheduleListRoute;
