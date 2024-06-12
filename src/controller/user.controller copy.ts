import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import bcrypt from "bcryptjs";
import { RegisterUserBody } from "../interfaces/IUser";

export class UserController {
  async create(req: Request, res: Response) {
    const {
      username,
      email,
      password,
      picture = null,
      userType,
    }: RegisterUserBody = req.body;

    if (!username || !email || !password || !userType) {
      return res
        .status(400)
        .json({ error: "Todos os campos exceto picture são obrigatórios." });
    }

    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ username: username }, { email: email }],
        },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Username ou email já está em uso." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      if (userType === "motorista") {
        await prisma.driver.create({
          data: {
            username,
            picture,
            yearOfWorkAsDriver: 2,
          },
        });

        const newUser = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            picture,
            userType,
          },
        });

        res.status(201).json(newUser);
      } else if (userType === "responsavel") {
        await prisma.responsible.create({
          data: {
            fullname: username,
            profission: "Programador",
            phoneNumber: "945551192",
          },
        });

        const newUser = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            picture,
            userType,
          },
        });

        res.status(201).json(newUser);
      }

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          picture,
          userType,
        },
      });

      res.status(201).json(newUser);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar usuário." });
    }
  }
  async view(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          picture: true,
          userType: true,
        },
      });
      return res.json(users);
    } catch (error) {
      res.sendStatus(500);
      res.json({ error: "Erro ao buscar os usuários" });
    }
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      username,
      email,
      password,
      picture = null,
      userType,
    }: RegisterUserBody = req.body;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          username,
          email,
          password: await bcrypt.hash(password, 10),
          picture,
          userType,
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
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      await prisma.user.delete({
        where: { id },
      });

      return res.status(200).json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar usuário." });
    }
  }
}
