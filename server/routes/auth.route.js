import express from "express";
import {
  generateAccount,
  logOut,
  refreshToken,
  sigIn,
} from "../controllers/auth.Controller.js";
const authRouter = express.Router();
authRouter.post("/generate-account", generateAccount);
authRouter.post("/login", sigIn);
authRouter.get("/logout", logOut);
authRouter.get("/refresh-token", refreshToken);

export default authRouter;
