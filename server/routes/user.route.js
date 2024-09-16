import express from "express";
import verifyRole from "../middleware/verifyRole.js";
import rolesList from "../config/roles_list.js";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  updateUserPassword,
  updateUserRole,
} from "../controllers/user.Controller.js";
const userRoute = express.Router();

userRoute.get("/get-users", verifyRole(rolesList.admin), getUsers);
userRoute.get("/get-user/:id", verifyRole(rolesList.admin), getUser);
userRoute.patch("/update-user/:id", verifyRole(rolesList.admin), updateUser);
userRoute.patch(
  "/update-user-password/:userId",
  verifyRole(rolesList.admin),
  updateUserPassword
);
userRoute.patch(
  "/update-user-role/:id",
  verifyRole(rolesList.admin),
  updateUserRole
);
userRoute.delete("/delete-user/:id", verifyRole(rolesList.admin), deleteUser);

export default userRoute;
