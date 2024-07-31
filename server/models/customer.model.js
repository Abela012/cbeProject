import { model, Schema } from "mongoose";

const CustomerSchema = new Schema(
  {
    customerName: { type: String },
    businessName: { type: String },
  },
  { timestamps: true }
);

export default Customer = model("Customer", CustomerSchema);
