import { prisma } from "../database/prisma";
import { Request, Response } from "express";
import QRCode from "qrcode";

let total: number;

export class StudentController {

  async createQRCode(req: Request, res: Response) {
    const { id_student } = req.query;

    try {
      // const url = req.query ?? id_student;
      // const qrCodeImage = await QRCode.toDataURL(url.toString());
      // // res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`);
      const qrCodeFileName = `student_qr_${id_student}.png`;

      const QR = QRCode.toFile(
        `./src/uploads/${qrCodeFileName}`,
        "Oi text",
        (err) => {
          if (err) {
            console.error("Erro ao gerar QR code:", err);
          } else {
            console.log("QR Code gerado com sucesso:", qrCodeFileName);
          }
        }
      );

      await prisma.totalStudents.create({
        data: {
          total: 1,
        },
      });

      const totalStudentsLenght = await prisma.totalStudents.count();
      total = totalStudentsLenght;

      return QR;
    } catch (err) {
      console.error("Erro ao gerar QRcode:", err);
      res.status(500).send("Erro interno do servidor: " + err);
    }
  }
  async create(req: Request, res: Response) {
    const { name, class: classe, qrcode, responsableName } = req.body;

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

      const responsable = await prisma.responsible.findFirstOrThrow({
        where: {
          fullname: responsableName,
        },
      });

      const newstudent = await prisma.student.create({
        data: {
          name,
          class: classe,
          qrcode,
          responsibleId: responsable.id,
          responsableId: responsable.id,
        },
        select: {
          id: true,
          name: true,
          class: true,
          qrcode: true,
          Responsible: true,
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
          id: true,
          name: true,
          class: true,
          qrcode: true,
          Responsible: true,
        },
      });
      return res.json(students);
    } catch (error) {
      res.sendStatus(500);
      res.json({ error: "Erro ao buscar os estudantes" });
    }
  }
  // verificar  a capacidade do carro e quandots alunos a borda e faer a subtrca
  async getAvailablePlaces(req: Request, res: Response) {
    try {
      // c3b699e2-ebd8-42ad-9a66-3d8bfaa6a337
      const vehicleCapacity = await prisma.driver.findFirst({
        where: { id: "c3b699e2-ebd8-42ad-9a66-3d8bfaa6a337" },
        include: {
          vehicles: {
            select: {
              vehicle: {
                select: {
                  capacity: true,
                },
              },
            },
          },
        },
      });

      const availablePlace = vehicleCapacity?.vehicles[0].vehicle.capacity! - total;
      console.log(total)
      // res.json(vehicleCapacity?.vehicles[0].vehicle.capacity!);
      res.json(availablePlace);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar estudantes." });
    }
  }

  async getTotalStudents(req: Request, res: Response) {
    try {
      const totalStudents = await prisma.totalStudents.findMany();

      return res.status(200).json(totalStudents);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar estudantes." });
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
