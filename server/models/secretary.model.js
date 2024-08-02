import { model, Schema } from "mongoose";

const SecretarySchema = new Schema({}, { timestamps: true });

const Secretary = model("Secretary", SecretarySchema);
export default Secretary;
