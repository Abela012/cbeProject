import express from "express";
import {
  getCustomer,
  registreCustomer,
} from "../controllers/customer.Controller.js";
import upload from "../middleware/uploader.js";

const customerRoute = express.Router();

customerRoute.post(
  "/customer-registration",
  upload.single("file"),
  registreCustomer
);
customerRoute.get("/get-customer", getCustomer);

export default customerRoute;
