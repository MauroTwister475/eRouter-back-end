import 'dotenv/config';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET ?? 'secret';

export interface IPayload {
  id: string;
  email: string;
  username: string;
  typeUser: string;
  token: string;
}

export default {
  sign: (payload: IPayload) =>
    jwt.sign(payload, SECRET, { expiresIn: '1d', algorithm: 'HS256' }),

  verify: (token: string) => jwt.verify(token, SECRET),
};