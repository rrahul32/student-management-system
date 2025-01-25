import { Request, Response } from 'express';
import { loginAdmin, loginStudent } from '../services/auth.service';

export const adminLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { status, ...body } = await loginAdmin(email, password);
  res.status(status).json(body);
};

export const studentLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { status, ...body } = await loginStudent(email, password);
  res.status(status).json(body);
};
