import { prisma } from "../database/prisma";
import { Request, Response } from "express";

export class RouteController {
  async create(req: Request, res: Response) {
    const { name, startLat, destinyLat, startLong, destinyLong } = req.body;

    if (!name || !startLat || !destinyLat || !startLong || !destinyLong) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      const existingRoute = await prisma.route.findFirst({
        where: {
          OR: [{ name: name }],
        },
      });

      if (existingRoute) {
        return res
          .status(400)
          .json({ error: "Já existe rota com esse nome." });
      }

      const newRoute = await prisma.route.create({
        data: {
          name, 
          startLat, 
          destinyLat,
          startLong, 
          destinyLong,
        },
      });

      res.status(201).json(newRoute);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar rota." });
    }
  }
  async view(req: Request, res: Response) {
    try {
      const routes = await prisma.route.findMany({
        select: {
          name: true, 
          startLat: true, 
          destinyLat: true,
          startLong: true, 
          destinyLong: true,
        },
      });
      return res.json(routes);
    } catch (error) {
      res.sendStatus(500);
      res.json({ error: "Erro ao buscar os rotas" });
    }
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, startLat, destinyLat, startLong, destinyLong } = req.body;

    try {
      const existingRoute = await prisma.route.findUnique({
        where: { id },
      });

      if (!existingRoute) {
        return res.status(404).json({ error: "veiculo não encontrado." });
      }

      const updatedroute = await prisma.route.update({
        where: { id },
        data: {
          name, 
          startLat, 
          destinyLat,
          startLong, 
          destinyLong,
        },
      });

      return res.status(200).json(updatedroute);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar a rota." });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const existingRoute = await prisma.route.findUnique({
        where: { id },
      });

      if (!existingRoute) {
        return res.status(404).json({ error: "rota não encontrado." });
      }

      await prisma.route.delete({
        where: { id },
      });

      return res.status(200).json({ message: "rota deletada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar a rota." });
    }
  }
}
