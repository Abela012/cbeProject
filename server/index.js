import dotenv from "dotenv";
dotenv.config();
import express, { application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import Customer from "./models/Customer.model.js";
import Appointment from "./models/appointment.model.js";

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] }));

mongoose.connect("mongodb://127.0.0.1:27017/appointment")

 
app.post('/create-appointment',async (req,res) => {
  const {
    customer_name,
    buissness_name,
    email,
    phone,
    office_id,
    start_time,
    end_time,
    category,
  } = req.body;
  
 const newCustomer =  Customer.create({
    customerName: customer_name,
    buissnesName: buissness_name,
    email: email,
    phone: phone
  })
  const newAppointment = Appointment.create({
    customerId: newCustomer._id,
    officeId:office_id,
    startTime: start_time,
    endTime: end_time,
    category:category
  })
  res.json({message:"successfully created"})
})
app.listen(port, () => {
  console.log(`server statrt on port:${port}`);
});
