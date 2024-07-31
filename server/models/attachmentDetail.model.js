import { model, Schema } from "mongoose";

const AttachmentDetailSchema = Schema(
  {
    officeName: { type: String },
  },
  { timestamp: true }
);

export default AttachmentDetail = model(
  "AttachmentDetail",
  AttachmentDetailSchema
);
