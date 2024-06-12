import express from 'express';
import { StudentController } from '../../controller/student.controller';

export const studenteRoutes = express.Router()
const student = new StudentController();

studenteRoutes.get("/student/view", student.view);
studenteRoutes.get("/student/students-presents", student.getTotalStudents);
studenteRoutes.get("/student/available-places", student.getAvailablePlaces);
studenteRoutes.post("/student/create", student.create);
studenteRoutes.post("/student-qrcode", student.createQRCode);
studenteRoutes.put("/student/update/:id", student.update);
studenteRoutes.delete("/student/delete/:id", student.delete);