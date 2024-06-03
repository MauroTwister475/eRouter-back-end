import express, { Request, Response, NextFunction } from 'express';

import { userRoutes } from './user/index.routes';
import { authRoutes } from "./auth/index.routes";
import { levelRoutes } from './level/index.routes';

export const routes = express.Router();

routes.get("/", (req, res) => {
  res.json({ message: "eRouter API Running"})
});

routes.use(levelRoutes);
routes.use(userRoutes);
routes.use(authRoutes);
