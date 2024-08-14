import express from "express";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  updateAppointment,
} from "../controllers/appointment.Controller.js";
const appointmentRouter = express.Router();

appointmentRouter.post("/create-appointment", createAppointment);

appointmentRouter.get("/get-appointments", getAppointments);

appointmentRouter.get("/get-appointment/:id", getAppointmentById);

appointmentRouter.patch("/update-appointment/:id", updateAppointment);

appointmentRouter.delete("/delete-appointments/:id", deleteAppointment);

export default appointmentRouter;
