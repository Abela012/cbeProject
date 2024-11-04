import { model, Schema } from "mongoose";

const CaseSchema = Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    officeId: { type: Schema.Types.ObjectId, ref: "OfficeManagement" },
    startDate: { type: String },
    dueDate: { type: String },
    caseNumber: { type: String },
    subject: { type: String },
    description: { type: String },
    caseId: { type: Schema.Types.ObjectId, ref: "Case" },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    status: {
      type: String,
      enum: ["Pending", "Canceled", "Completed"],
      default: "Pending",
    },
    currentAssignedOfficeId: {
      type: Schema.Types.ObjectId,
      ref: "OfficeManagement",
    },
    assignedOfficeIdList: [
      { type: Schema.Types.ObjectId, ref: "OfficeManagement" },
    ],
    assignee: { type: Schema.Types.ObjectId, ref: "User" },
    assigner: { type: Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  },
  { timestamps: true }
);

const Case = model("Case", CaseSchema);
export default Case;
