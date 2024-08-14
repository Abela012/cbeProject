import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    profile: { type: String },
    password: { type: String },
    roleType: [{ type: Number, enum: [1234, 4567, 8910] }],
    otp: { type: String },
    status: { type: String },
    officeId: { type: Schema.Types.ObjectId, ref: "OfficeManagement" },
    refreshToken: { type: String },
  },
  { timestamp: true }
);
const User = model("User", UserSchema);
export default User;
