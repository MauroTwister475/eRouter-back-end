import express from 'express';

import { userRoutes } from './user/index.routes';
import { authRoutes } from "./auth/index.routes";
import { vehicleRoutes } from "./vehicle/index.routes";
import { studenteRoutes } from './students/index.routes';
import { responsableRoutes } from './responsable/index.routes';
import { driverRoutes } from './driver/index.routes';
import { routeRoutes } from './route/index.routes';
import { allocationRoutes } from './allocation/index.routes';

export const routes = express.Router();

routes.get("/", (_, res) => {
  res.json({ message: "eRouter API Running"})
});

routes.use(userRoutes);
routes.use(authRoutes);
routes.use(vehicleRoutes);
routes.use(studenteRoutes);
routes.use(responsableRoutes);
routes.use(driverRoutes);
routes.use(routeRoutes);
routes.use(allocationRoutes);
