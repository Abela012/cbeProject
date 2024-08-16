import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import helmet from "helmet";
import Customer from "./models/customer.model.js";
import Appointment from "./models/appointment.model.js";
import ConnectToDB from "./db/dbConnections.js";
import Case from "./models/case.model.js";
import Category from "./models/category.model.js";

import isAuthenticated from "./middleware/isAuthenticated.js";

import authRouter from "./routes/auth.route.js";
import appointmentRouter from "./routes/appointment.route.js";
import caseRouter from "./routes/case.route.js";
import categoryRouter from "./routes/category.route.js";
import customerRoute from "./routes/customer.route.js";

ConnectToDB();

const port = process.env.PORT;
const app = express();
app.use(cookieParser());
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

app.use("/auth", authRouter);

app.use(isAuthenticated);
app.use("/", appointmentRouter);
app.use("/", caseRouter);
app.use("/", categoryRouter);
app.use("/", customerRoute);

// app.post("/create-appointment", async (req, res) => {
//   try {
//     // console.log(req.body);
//     const {
//       customer_name,
//       buissness_name,
//       email,
//       phone,
//       office_id,
//       start_time,
//       end_time,
//       category,
//     } = req.body;

//     const newCustomer = await Customer.create({
//       customerName: customer_name,
//       businessName: buissness_name,
//       email: email,
//       phone: phone,
//     });

//     const newAppointment = await Appointment.create({
//       customerId: newCustomer._id,
//       officeId: office_id,
//       startTime: start_time,
//       endTime: end_time,
//       category: category,
//     });
//     return res.status(201).json({ ...newCustomer, ...newAppointment });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/customer-registration", async (req, res) => {
//   let {
//     firstName,
//     middleName,
//     lastName,
//     businessName,
//     customerEmail,
//     phoneNumber,
//     address,
//     catagory,
//   } = req.body;

//   let fullName = firstName + " " + middleName + " " + lastName;

//   const newCustomer = await Customer.create({
//     firstName,
//     middleName,
//     lastName,
//     fullName,
//     businessName,
//     customerEmail,
//     phoneNumber,
//     address,
//     catagory,
//   });

//   return res.status(201).json({ ...newCustomer });
// });

// app.get("/get-appointments", async (req, res) => {
//   try {
//     if (req.query.q != "null" && req.query.q !== undefined) {
//       let query = req.query.q;
//       const appointments = await Appointment.find({}).populate({
//         path: "customerId",
//         // select: "customerName email phone",
//       });
//       const filterdAppointments = appointments.filter((appointment) => {
//         return appointment.customerId.fullName
//           .toLowerCase()
//           .includes(query.toLowerCase());
//       });

//       return res.json(filterdAppointments);
//     }
//     const appointments = await Appointment.find({}).populate({
//       path: "customerId",
//       // select: "customerName email phone",
//     });
//     // console.log(appointments);
//     return res.json(appointments);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("server error");
//   }
// });

// app.get("/get-customer", async (req, res) => {
//   try {
//     if (req.query.q != "null") {
//       let query = req.query.q;
//       const customers = await Customer.find({
//         $or: [{ firstName: query }, { customerEmail: query }],
//       });
//       console.log(customers);

//       // const filterdCustomers = customers.filter((customer) => {
//       //   return (
//       //     customer.firstName.toLowerCase().includes(query.toLowerCase())
//       //     ||
//       //     customer.email.toLowerCase().includes(query.toLowerCase())
//       //   );
//       // });

//       return res.json(customers);
//     }
//     // const customers = await Customer.find({});
//     return res.json([]);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("server error");
//   }
// });

// app.get("/get-appointment/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const appointement = await Appointment.findOne({ _id: id }).populate(
//       "customerId"
//     );
//     res.json(appointement);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("Server error");
//   }
// });

// app.patch("/update-appointment/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       fullName,
//       buissnessName,
//       customerEmail,
//       phoneNumber,
//       office_id,
//       start_time,
//       end_time,
//       category,
//     } = req.body;

//     console.log(req.body);

//     const updatedappointment = await Appointment.findOneAndUpdate(
//       { _id: id },
//       {
//         officeId: office_id,
//         startTime: start_time,
//         endTime: end_time,
//         category: category,
//       }
//     );
//     const [firstName, middleName, lastName] = fullName.split(" ");
//     const updatedCustomer = await Customer.findOneAndUpdate(
//       { _id: updatedappointment.customerId },
//       {
//         firstName,
//         middleName,
//         lastName,
//         fullName: fullName,
//         businessName: buissnessName,
//         customerEmail: customerEmail,
//         phoneNumber: phoneNumber,
//       }
//     );
//     return res.json(updatedappointment);
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.delete("/delete-appointments/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const appointment = await Appointment.findOneAndDelete({ _id: id });
//     // console.log(appointment);
//     return res.json(appointment);
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/create-case", async (req, res) => {
//   try {
//     const { caseCategory, customerId, subject } = req.body;

//     const newCase = await Case.create({
//       customerId: customerId,
//       // category: caseCategory,
//       subject: subject,
//       caseNumber: "",
//     });
//     return res.status(201).json("Case created sucessfully");
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("Server error");
//   }
// });

// app.get("/get-cases", async (req, res) => {
//   try {
//     if (req.query.q != "null" && req.query.q !== undefined) {
//       let query = req.query.q;
//       const cases = await Case.find({ caseNumber: query }).populate({
//         path: "customerId",
//         // select: "customerName email phone",
//       });

//       return res.json(cases);
//     }
//     const cases = await Case.find({}).populate({
//       path: "customerId",
//       // select: "customerName email phone",
//     });
//     return res.json(cases);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("Server error");
//   }
// });

// app.get("/get-case/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const appointement = await Case.findOne({ _id: id }).populate("customerId");
//     res.json(appointement);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("Server error");
//   }
// });

// app.patch("/update-case/:id", async (req, res) => {
//   try {
//     // const { id } = req.params;
//     // const {} = req.body;

//     // const updatedCase = await Case.findOneAndUpdate({ _id: id }, {});

//     return res.json("updatedCase");
//     // return res.json(updatedCase);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("Server error");
//   }
// });

// app.delete("/delete-case/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedCase = await Case.findOneAndDelete({ _id: id });
//     // console.log(deletedCase);
//     return res.json(deletedCase);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("Server error");
//   }
// });

// app.get("/get-categories", async (req, res) => {
//   try {
//     const categories = await Category.find({});
//     return res.json(categories);
//   } catch (error) {
//     return res.status(500).json("Server error");
//   }
// });

app.listen(port, () => {
  console.log(`server statrt on port: ${port}`);
});
