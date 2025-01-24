import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ADMIN_CREDENTIALS } from '../config/admin';

export const adminLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    res.status(200).json({ message: 'Login successful', token });
    return;
  }

  res.status(401).json({ message: 'Invalid email or password' });
  return;
};
