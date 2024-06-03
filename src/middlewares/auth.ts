import { NextFunction, Request, Response } from "express";

// Middleware de autorização para admin
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Verifica se o usuário é um admin
  if (req.user.userType! !== 'Admin') {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  next();
};

// Middleware de autorização para motorista
export const authorizeDriver = (req: Request, res: Response, next: NextFunction) => {
  // Verifica se o usuário é um motorista
  if (req.user.userType! !== 'Driver') {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  next();
};

// Middleware de autorização para responsável
export const authorizeResponsable = (req: Request, res: Response, next: NextFunction) => {
  // Verifica se o usuário é um responsável
  if (req.user.userType! !== 'Responsable') {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  next();
};
