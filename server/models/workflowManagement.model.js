import { model, Schema } from "mongoose";

const WorkflowManagementSchema = Schema(
  {
    caseId: { type: String },
  },
  {
    assigneFrom: { type: String },
  },
  {
    assigneTo: { type: String },
  },
  { timestamp: true }
);

export default WorkflowManagement = model(
  "WorkflowManagement",
  WorkflowManagementSchema
);
