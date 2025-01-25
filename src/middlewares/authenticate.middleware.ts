import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserType } from '../utils';
import { JwtTokenPayload } from '../utils/types';

const authenticate =
  (userType: UserType) => (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Access denied' });
      return;
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!,
      ) as JwtTokenPayload;
      if (decoded.type !== userType) {
        res.status(403).json({ message: 'Forbidden' });
        return;
      }
      req.user = decoded;
      next();
    } catch (err) {
      console.log('🚀 ~ err:', err);
      res.status(400).json({ message: 'Invalid token' });
      return;
    }
  };

export default authenticate;
