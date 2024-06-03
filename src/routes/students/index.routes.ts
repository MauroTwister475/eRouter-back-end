import express from 'express';
import { StudentController } from "../../controllers/student.controller";

export const studenteRoutes = express.Router()
const student = new StudentController();

studenteRoutes.get("/student/view", student.view);
studenteRoutes.post("/student/create", student.create);
studenteRoutes.put("/student/update/:id", student.update);
studenteRoutes.delete("/student/delete/:id", student.delete);