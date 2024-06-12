import express from 'express';
import { ResponsableController } from '../../controller/responsable.controller';

export const responsableRoutes = express.Router()
const responsable = new ResponsableController();

responsableRoutes.get("/responsable/view", responsable.view);
responsableRoutes.post("/responsable/create", responsable.create);
responsableRoutes.put("/responsable/update/:id", responsable.update);
responsableRoutes.delete("/responsable/delete/:id", responsable.delete);