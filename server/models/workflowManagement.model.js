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

const WorkflowManagement = model(
  "WorkflowManagement",
  WorkflowManagementSchema
);
export default WorkflowManagement;
