import { model, Schema } from "mongoose";

const AppointmentSchema = new Schema(
  {
    officeId: {},
    startTime: { type: String },
    endTime: { type: String },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    status: { type: String },
    caseId: { type: Schema.Types.ObjectId, ref: "Case" },
    category: { type: String },
  },
  { timestamps: true }
);

const Appointment = model("Appointment", AppointmentSchema);
export default Appointment
