import { model, Schema } from "mongoose";

const CustomerSchema = new Schema(
  {
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    fullName: { type: String },
    businessName: { type: String },
    customerEmail: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    customerFile: {
      fileName: { type: String },
      file: { type: Buffer },
      key: { type: String },
      iv: { type: String },
    },
  },
  { timestamps: true }
);

const Customer = model("Customer", CustomerSchema);
export default Customer;
