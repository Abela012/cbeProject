import { model, Schema } from "mongoose";

const CaseSchema = Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
  },
  {
    appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment" },
  },
  {
    staffId: { type: Schema.Types.ObjectId, ref: "Staff" },
  },
  {
    officeId: { type: Schema.Types.ObjectId, ref: "Office" },
  },
  {
    startDate: { type: String },
  },
  {
    dueDate: { type: String },
  },
  {
    subject: { type: String },
  },
  {
    caseId: { type: Schema.Types.ObjectId, ref: "Case" },
  },
  {
    category: { type: String },
  },
  {
    status: { type: String },
  },
  {
    assignee: { type: String },
  },
  {
    assigned: { type: String },
  },
  { timestamp: true }
);

const Case = model("Case", CaseSchema);
export default Case;
