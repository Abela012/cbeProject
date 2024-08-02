import { model, Schema } from "mongoose";

const OfficeManagementSchema = Schema(
  {
    officeName: { type: String },
  },
  { timestamp: true }
);

const OfficeManagement = model("OfficeManagement", OfficeManagementSchema);
export default OfficeManagement;
