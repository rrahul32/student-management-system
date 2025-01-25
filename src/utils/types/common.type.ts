import { JwtPayload } from 'jsonwebtoken';
import { UserType } from '../constants';

export type JwtTokenPayload = JwtPayload & {
  email: string;
  type: UserType;
};

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtTokenPayload;
  }
}
