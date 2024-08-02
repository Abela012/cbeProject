import { model, Schema } from "mongoose";

const AppointmentSchema = new Schema(
  {
    officeId: {},
    startTime: { type: Date },
    endTime: { type: Date },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    status: {
      type: String,
      enum: ["pending", "canceled", "completed"],
      default: "pending",
    },
    caseId: { type: Schema.Types.ObjectId, ref: "Case" },
    category: { type: String },
  },
  { timestamps: true }
);

const Appointment = model("Appointment", AppointmentSchema);
export default Appointment
