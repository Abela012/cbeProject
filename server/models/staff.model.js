import { model, Schema } from "mongoose";

const StaffSchema = new Schema({}, { timestamps: true });

const Staff = model("Staff", StaffSchema);
export default Staff;
