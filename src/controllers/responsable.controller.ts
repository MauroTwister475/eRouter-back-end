import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export class ResponsableController {
  async create(req: Request, res: Response) {
    const { fullname, profession, phoneNumber } = req.body;

    if (!fullname || !profession || !phoneNumber) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      const existingUser = await prisma.responsible.findFirst({
        where: {
          OR: [{ fullname: fullname }],
        },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Já existe motorista com esse nome." });
      }

      const newResponsable = await prisma.responsible.create({
        data: {
          fullname,
          profession,
          phoneNumber,
        },
      });

      res.status(201).json(newResponsable);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar motorista." });
    }
  }
  async view(req: Request, res: Response) {
    try {
      const responsables = await prisma.responsible.findMany({
        select: {
          id: true,
          fullname: true,
          profession: true,
          phoneNumber: true,
        },
      });
      return res.json(responsables);
    } catch (error) {
      res.sendStatus(500);
      res.json({ error: "Erro ao buscar os responsaveis" });
    }
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { fullname, profession, phoneNumber } = req.body;

    try {
      const existingResponsable = await prisma.responsible.findUnique({
        where: { id },
      });

      if (!existingResponsable) {
        return res.status(404).json({ error: "Responsavél não encontrado." });
      }

      const updatedResponsable = await prisma.responsible.update({
        where: { id },
        data: {
          fullname,
          profession,
          phoneNumber,
        },
      });

      return res.status(200).json(updatedResponsable);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const existingResponsable = await prisma.responsible.findUnique({
        where: { id },
      });

      if (!existingResponsable) {
        return res.status(404).json({ error: "Motorista não encontrado." });
      }

      await prisma.responsible.delete({
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
