import { model, Schema } from "mongoose";

const StaffSchema = new Schema({}, { timestamps: true });

export default Staff = model("Staff", StaffSchema);
