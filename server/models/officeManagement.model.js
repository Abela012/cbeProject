import { model, Schema } from "mongoose";

const OfficeManagementSchema = Schema(
  {
    officeName: { type: String },
  },
  { timestamp: true }
);

export default OfficeManagement = model(
  "OfficeManagement",
  OfficeManagementSchema
);
