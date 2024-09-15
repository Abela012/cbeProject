import express from "express";
import verifyRole from "../middleware/verifyRole.js";
import rolesList from "../config/roles_list.js";
import {
  getCustomer,
  registreCustomer,
} from "../controllers/customer.Controller.js";
import upload from "../middleware/uploader.js";

const customerRoute = express.Router();

customerRoute.post(
  "/customer-registration",
  upload.single("file"),
  verifyRole(
    rolesList.secretary,
    rolesList.president,
    rolesList.vp,
    rolesList.cos
  ),
  registreCustomer
);
customerRoute.get("/get-customer", getCustomer);

export default customerRoute;
