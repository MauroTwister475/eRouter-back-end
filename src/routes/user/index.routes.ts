import express  from "express";
import { UserController } from "../../controllers/user.controller";

export const userRoutes = express.Router()
const user = new UserController();

userRoutes.get("/user/view", user.view);
userRoutes.post("/user/create", user.create);
userRoutes.put("/user/update/:id", user.update);
userRoutes.delete("/user/delete/:id", user.delete);