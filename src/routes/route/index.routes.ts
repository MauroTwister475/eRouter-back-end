import express from 'express';
import { RouteController } from '../../controller/route.controller';

export const routeRoutes = express.Router()
const route = new RouteController();

routeRoutes.get("/route/view", route.view);
routeRoutes.post("/route/create", route.create);
routeRoutes.put("/route/update/:id", route.update);
routeRoutes.delete("/route/delete/:id", route.delete);