import { model, Schema } from "mongoose";

const RoleSchema = Schema(
  {
    roleName: { type: String },
    roleType: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Role = model("Role", RoleSchema);

export default Role;
