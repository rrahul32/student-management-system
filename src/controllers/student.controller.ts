import { Request, Response } from 'express';
import { addStudent, getStudentTasks } from '../services/student.service';
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

  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { status, ...body } = await getStudentTasks(
    req.user.email,
    new PageOptionsDto(Number(page) || 1, Number(limit) || 10),
  );
  res.status(status).json(body);
};
