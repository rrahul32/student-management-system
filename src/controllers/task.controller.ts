import { Request, Response } from 'express';
import { AssignTaskParamsDto } from '../utils';
import { assignTask } from '../services/task.service';

export const assignTaskController = async (req: Request, res: Response) => {
  const params: AssignTaskParamsDto = req.body;

  const { status, ...body } = await assignTask(params);
  res.status(status).json(body);
};
