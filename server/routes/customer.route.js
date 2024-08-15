import express from "express";
import {
  getCustomer,
  registreCustomer,
} from "../controllers/customer.Controller.js";

const customerRoute = express.Router();

customerRoute.post("/customer-registration", registreCustomer);
customerRoute.get("/get-customer", getCustomer);

export default customerRoute;
