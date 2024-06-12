import express  from "express";
import { AuthController } from "../../controller/auth.controller";

export const authRoutes = express.Router()
const auth = new AuthController();

authRoutes.post("/login", auth.login);