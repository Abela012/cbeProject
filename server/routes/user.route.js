import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  updateUserRole,
} from "../controllers/user.Controller.js";
const userRoute = express.Router();

userRoute.get("/get-users", getUsers);
userRoute.get("/get-user/:id", getUser);
userRoute.patch("/update-user/:id", updateUser);
userRoute.patch("/update-user-role/:id", updateUserRole);
userRoute.delete("/delete-user/:id", deleteUser);

export default userRoute;
