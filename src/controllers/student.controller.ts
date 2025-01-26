import { Request, Response } from 'express';
import {
  addStudent,
  getStudentTask,
  getStudentTasks,
  updateStudentTaskStatus,
} from '../services/student.service';
import { AddStudentParamsDto, PageOptionsDto } from '../utils/dtos';

export const addStudentController = async (req: Request, res: Response) => {
  const params: AddStudentParamsDto = req.body;

  try {
    await addStudent(params);
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error });
  }
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

export const updateStudentTaskStatusController = async (
  req: Request,
  res: Response,
) => {
  const { taskId } = req.params;
  const { status } = req.body;

  const { status: responseStatus, ...body } = await updateStudentTaskStatus(
    taskId,
    status,
    req.user!.email,
  );

  res.status(responseStatus).json(body);
};
