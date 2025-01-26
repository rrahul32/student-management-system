import { Request, Response } from 'express';
import {
  addStudent,
  assignStudentTask,
  completeStudentTask,
  getStudents,
  getStudentTask,
  getStudentTasks,
} from '../services/student.service';
import {
  AddStudentParamsDto,
  AssignTaskParamsDto,
  PageOptionsDto,
} from '../utils';

export const addStudentController = async (req: Request, res: Response) => {
  const params: AddStudentParamsDto = req.body;
  const { status, ...body } = await addStudent(params);
  res.status(status).json(body);
};

export const getStudentsController = async (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const { status, ...body } = await getStudents(
    new PageOptionsDto(Number(page) || 1, Number(limit) || 10),
  );
  res.status(status).json(body);
};

export const getStudentTasksController = async (
  req: Request,
  res: Response,
) => {
  const { page, limit } = req.query;
  const { status, ...body } = await getStudentTasks(
    req.user!.email,
    new PageOptionsDto(Number(page) || 1, Number(limit) || 10),
  );
  res.status(status).json(body);
};

export const getStudentTaskDetailsController = async (
  req: Request,
  res: Response,
) => {
  const { taskId } = req.params;

  const { status, ...body } = await getStudentTask(taskId, req.user!.email);

  res.status(status).json(body);
};

export const completeStudentTaskController = async (
  req: Request,
  res: Response,
) => {
  const { taskId } = req.params;

  const { status: responseStatus, ...body } = await completeStudentTask(
    taskId,
    req.user!.email,
  );

  res.status(responseStatus).json(body);
};

export const assignStudentTaskController = async (
  req: Request,
  res: Response,
) => {
  const params: AssignTaskParamsDto = req.body;
  const { email } = req.params;

  const { status, ...body } = await assignStudentTask(email, params);
  res.status(status).json(body);
};
