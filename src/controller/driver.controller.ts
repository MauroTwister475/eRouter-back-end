import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export class DriverController {
  async create(req: Request, res: Response) {
    const { username, picture = null, yearOfWorkAsDriver } = req.body;

    if (!username || !yearOfWorkAsDriver) {
      return res
        .status(400)
        .json({ error: "Todos os campos exceto picture são obrigatórios." });
    }

    try {
      const existingUser = await prisma.driver.findFirst({
        where: {
          OR: [{ username: username }],
        },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Já existe motorista com esse nome." });
      }

      const newDriver = await prisma.driver.create({
        data: {
          username,
          picture,
          yearOfWorkAsDriver,
        },
      });

      res.status(201).json(newDriver);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar motorista." });
    }
  }
  async view(req: Request, res: Response) {
    try {
      const drivers = await prisma.driver.findMany({
        select: {
          id: true,
          username: true,
          picture: true,
          yearOfWorkAsDriver: true,
          allocation: true,
          vehicles: true,
        },
      });
      return res.json(drivers);
    } catch (error) {
      res.sendStatus(500);
      res.json({ error: "Erro ao buscar os usuários" });
    }
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { username, picture = null, yearOfWorkAsDriver } = req.body;

    try {
      const existingUser = await prisma.driver.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const updatedUser = await prisma.driver.update({
        where: { id },
        data: {
          username,
          picture,
          yearOfWorkAsDriver,
        },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const existingUser = await prisma.driver.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "Motorista não encontrado." });
      }

      await prisma.driver.delete({
        where: { id },
      });

      return res
        .status(200)
        .json({ message: "Motorista deletado com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar usuário." });
    }
  }
}
