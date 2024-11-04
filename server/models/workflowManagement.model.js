import { model, Schema } from "mongoose";

const WorkflowManagementSchema = Schema(
  {
    taskId: { type: Schema.Types.ObjectId, ref: "Task" },
    followUp: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        message: { type: String },
        time: { type: String },
      },
    ],
  },
  { timestamp: true }
);

const WorkflowManagement = model(
  "WorkflowManagement",
  WorkflowManagementSchema
);
export default WorkflowManagement;
