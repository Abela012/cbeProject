import { model, Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    caseId: { type: Schema.Types.ObjectId, ref: "Case" },
    officeId: { type: Schema.Types.ObjectId, ref: "OfficeManagement" }, // hold the officeId of the assigned office
    description: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Canceled", "Completed"],
      default: "Pending",
    },
    dueDate: { type: String },
    assigner: { type: Schema.Types.ObjectId, ref: "User" },
    isSeen: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamp: true }
);
const Task = model("Task", TaskSchema);
export default Task;
