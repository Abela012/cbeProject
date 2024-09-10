import express from "express";
import upload from "../middleware/uploader.js";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  updateAppointment,
  updateAppointmentStatus,
} from "../controllers/appointment.Controller.js";
const appointmentRouter = express.Router();

appointmentRouter.post(
  "/create-appointment",
  upload.single("file"),
  createAppointment
);

appointmentRouter.get("/get-appointments/:officeId", getAppointments);

appointmentRouter.get("/get-appointment/:id", getAppointmentById);

appointmentRouter.patch("/update-appointment/:id", updateAppointment);

appointmentRouter.patch(
  "/update-appointment-status/:id",
  updateAppointmentStatus
);

appointmentRouter.delete("/delete-appointments/:id", deleteAppointment);

export default appointmentRouter;
