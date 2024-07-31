import { model, Schema } from "mongoose";

const SecretarySchema = new Schema({}, { timestamps: true });

export default Secretary = model("Secretary", SecretarySchema);
