import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import helmet from "helmet";
import Customer from "./models/customer.model.js";
import Appointment from "./models/appointment.model.js";
import ConnectToDB from "./db/dbConnections.js";

ConnectToDB();

const port = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/create-appointment", async (req, res) => {
  try {
    console.log(req.body);
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

    const newCustomer = await Customer.create({
      customerName: customer_name,
      businessName: buissness_name,
      email: email,
      phone: phone,
    });

    const newAppointment = await Appointment.create({
      customerId: newCustomer._id,
      officeId: office_id,
      startTime: start_time,
      endTime: end_time,
      category: category,
    });
    return res.json({ ...newCustomer, ...newAppointment });
  } catch (error) {
    console.log(error);
  }
});

app.get("/get-appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find({}).populate({
      path: "customerId",
      // select: "customerName email phone",
    });
    // console.log(appointments);
    return res.json(appointments);
  } catch (error) {
    console.log(error);
  }
});

app.patch("/update-appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
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

    const updatedappointment = await Appointment.findOneAndUpdate(
      { _id: id },
      {
        officeId: office_id,
        startTime: start_time,
        endTime: end_time,
        category: category,
      }
    );

    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: updatedappointment.customerId },
      {
        customerName: customer_name,
        businessName: buissness_name,
        email: email,
        phone: phone,
      }
    );
    return res.json(updatedappointment);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete-appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOneAndDelete({ _id: id });
    // console.log(appointments);
    return res.json(appointment);
  } catch (error) {
    console.log(error);
  }
});

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
  console.log(`server statrt on port: ${port}`);
});
