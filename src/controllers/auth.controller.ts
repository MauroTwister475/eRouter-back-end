import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { LoginRequestBody } from "../interfaces/ILogin";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generate-token";

type UserLogged = {
  id: string;
  username: string;
  email: string;
  picture: string | null;
  userType: string;
  // token: string;
} | null


export class AuthController {
  async login(req: Request, res: Response) {
    const { email, password, userType }: LoginRequestBody = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email, userType },
      });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch || !email || userType !== user.userType) {
        return res.status(401).json({ error: "email ou password incorrecta." });
      }
      // const token = generateToken(user.id);

      const userLoggin: UserLogged = {
        id: user.id,
        username: user.username,
        email: user.email,
        picture: user.picture,
        userType: user.userType,
        // token: token,
      }

      return res.status(200).json(userLoggin);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao fazer login." });
    }
  }
}