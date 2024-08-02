import { model, Schema } from "mongoose";

const AttachmentDetailSchema = Schema(
  {
    officeName: { type: String },
  },
  { timestamp: true }
);

const AttachmentDetail = model("AttachmentDetail", AttachmentDetailSchema);
export default AttachmentDetail;
