import { model, Schema } from "mongoose";

const TaskSchema = new Schema(
  {
    caseId: { type: Schema.Types.ObjectId, ref: "Case" },
    officeId: { type: Schema.Types.ObjectId, ref: "OfficeManagement" },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamp: true }
);
const Task = model("Task", TaskSchema);
export default Task;
