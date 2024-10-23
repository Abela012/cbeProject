import { model, Schema } from "mongoose";

const AppointmentSchema = new Schema(
  {
    officeId: { type: Schema.Types.ObjectId, ref: "OfficeManagement" },
    startTime: { type: Date },
    endTime: { type: Date },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    staffId: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["Pending", "Canceled", "Completed"],
      default: "Pending",
    },
    appointmentFile: {
      fileName: { type: String },
      file: { type: Buffer },
      key: { type: String },
      iv: { type: String },
    },
    caseId: { type: Schema.Types.ObjectId, ref: "Case" },
    category: { type: String },
    isDeleted: { type: Boolean, default: false },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  },
  { timestamps: true }
);

const Appointment = model("Appointment", AppointmentSchema);
export default Appointment;
