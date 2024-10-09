import express from "express";
import upload from "../middleware/uploader.js";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointmentByIdForFileView,
  getAppointments,
  getAppointmentStati,
  updateAppointment,
  updateAppointmentStatus,
} from "../controllers/appointment.Controller.js";
import verifyRole from "../middleware/verifyRole.js";
import rolesList from "../config/roles_list.js";
const appointmentRouter = express.Router();

appointmentRouter.post(
  "/create-appointment",
  upload.single("file"),
  verifyRole(
    rolesList.secretary,
    rolesList.president,
    rolesList.vp,
    rolesList.cos
  ),
  createAppointment
);

appointmentRouter.get(
  "/get-appointment-stati",
  verifyRole(
    rolesList.secretary,
    rolesList.president,
    rolesList.vp,
    rolesList.cos
  ),
  getAppointmentStati
);

appointmentRouter.get(
  "/get-appointments/:officeId",
  verifyRole(
    rolesList.secretary,
    rolesList.president,
    rolesList.vp,
    rolesList.cos
  ),
  getAppointments
);

appointmentRouter.get(
  "/get-appointment/:id",
  verifyRole(
    rolesList.secretary,
    rolesList.president,
    rolesList.vp,
    rolesList.cos
  ),
  getAppointmentById
);
appointmentRouter.get(
  "/view-file/:id",
  verifyRole(
    rolesList.secretary,
    rolesList.president,
    rolesList.vp,
    rolesList.cos
  ),
  getAppointmentByIdForFileView
);

appointmentRouter.patch(
  "/update-appointment/:id",
  verifyRole(
    rolesList.secretary,
    rolesList.president,
    rolesList.vp,
    rolesList.cos
  ),
  updateAppointment
);

appointmentRouter.patch(
  "/update-appointment-status/:id",
  verifyRole(
    rolesList.secretary,
    rolesList.president,
    rolesList.vp,
    rolesList.cos
  ),
  updateAppointmentStatus
);

appointmentRouter.delete(
  "/delete-appointments/:id",
  verifyRole(
    rolesList.secretary,
    rolesList.president,
    rolesList.vp,
    rolesList.cos
  ),
  deleteAppointment
);

export default appointmentRouter;
