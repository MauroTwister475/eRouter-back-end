import { prisma } from "../database/prisma";
import { Request, Response } from "express";

export class StudentController {
  async create(req: Request, res: Response) {
    const { name, class: classe, qrcode } = req.body;

    if (!name || !classe || !qrcode) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      const existingStudent = await prisma.student.findFirst({
        where: {
          OR: [{ name }],
        },
      });

      if (existingStudent) {
        return res
          .status(400)
          .json({ error: "Já existe estudante com esse placa." });
      }

      const newstudent = await prisma.student.create({
        data: {
          name,
          class: classe,
          qrcode,
          responsable: {}
        },
      });

      res.status(201).json(newstudent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar estudante." });
    }
  }
  async view(req: Request, res: Response) {
    try {
      const students = await prisma.student.findMany({
        select: {
          name: true,
          class: true,
          qrcode: true,
        },
      });
      return res.json(students);
    } catch (error) {
      res.sendStatus(500);
      res.json({ error: "Erro ao buscar os estudantes" });
    }
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, class: classe, qrcode } = req.body;

    try {
      const existingStudent = await prisma.student.findUnique({
        where: { id },
      });

      if (!existingStudent) {
        return res.status(404).json({ error: "estudante não encontrado." });
      }

      const updatedstudent = await prisma.student.update({
        where: { id },
        data: {
          name,
          class: classe,
          qrcode,
        },
      });

      return res.status(200).json(updatedstudent);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const existingStudent = await prisma.student.findUnique({
        where: { id },
      });

      if (!existingStudent) {
        return res.status(404).json({ error: "estudante não encontrado." });
      }

      await prisma.student.delete({
        where: { id },
      });

      return res
        .status(200)
        .json({ message: "estudante deletado com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar estudante." });
    }
  }
}
