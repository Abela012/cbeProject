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
  res.json({ ...newCustomer, ...newAppointment });
});

app.listen(port, () => {
  console.log(`server statrt on port: ${port}`);
});
