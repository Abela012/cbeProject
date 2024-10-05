import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import helmet from "helmet";
import ConnectToDB from "./db/dbConnections.js";

import isAuthenticated from "./middleware/isAuthenticated.js";

import authRouter from "./routes/auth.route.js";
import appointmentRouter from "./routes/appointment.route.js";
import caseRouter from "./routes/case.route.js";
import categoryRouter from "./routes/category.route.js";
import customerRoute from "./routes/customer.route.js";
import userRoute from "./routes/user.route.js";
import officeManagementRouter from "./routes/officeManagement.route.js";
import roleRouter from "./routes/role.route.js";
import scheduleListRoute from "./routes/scheduleList.route.js";

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
app.use(express.static("./temp"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "100mb" }));

app.use("/auth", authRouter);

app.use(isAuthenticated);
app.use("/", appointmentRouter);
app.use("/", caseRouter);
app.use("/", categoryRouter);
app.use("/", officeManagementRouter);
app.use("/", customerRoute);
app.use("/", userRoute);
app.use("/", roleRouter);
app.use("/", scheduleListRoute);

app.listen(port, () => {
  console.log(`server statrt on port: ${port}`);
});
