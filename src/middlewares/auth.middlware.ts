// import { prisma } from '../database/prisma'; // Certifique-se de importar o Prisma Client corretamente
// import jwt from 'jsonwebtoken';
// import { UnauthorizedError } from '../utils/api-errors';

// type JwtPayload = {
//   id: string;
// };

// // Definindo um tipo estendido para a requisição que inclui `user`
// interface AuthenticatedRequest extends Request {
//   user?: {
//     id: string;
//     username: string;
//     email: string;
//     userType: string;
//   };
// }

// export const authMiddleware = async (
//   req: AuthenticatedRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//     throw new UnauthorizedError('Usuário não autorizado');
//   }

//   const token = authorization.split(' ')[1];

//   try {
//     const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as JwtPayload;

//     const user = await prisma.user.findUnique({
//       where: { id },
//     });

//     if (!user) {
//       throw new UnauthorizedError('Usuário não autorizado');
//     }

//     const { password: _, ...loggedUser } = user;

//     req.user = loggedUser; // Armazenando as informações do usuário em `req.user`

//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };
