

// import express from "express";
// import { authorizeAdmin, authorizeDriver, authorizeResponsable } from "../../middlewares/auth";

// export const levelRoutes = express.Router();

// levelRoutes.get('/admin/users', authorizeAdmin, (req, res) => {
//   // Apenas o admin pode acessar essa rota
//   res.json({ message: 'Listagem de usuários (admin)' });
// });

// // Exemplo de rota protegida para motorista
// levelRoutes.get('/driver/map', authorizeDriver, (req, res) => {
//   // Apenas o motorista pode acessar essa rota
//   res.json({ message: 'Visualização do mapa (motorista)' });
// });


// levelRoutes.get('/responsable/students', authorizeResponsable, (req, res) => {
//   // Apenas o responsável pode acessar essa rota
//   res.json({ message: 'Listagem de estudantes (responsável)' });
// });
