import { Request, Response } from 'express';
import { AddStudentParamsDto } from '../utils/dtos/student.dto';
import { addStudent } from '../services/student.service';

export const addStudentController = async (req: Request, res: Response) => {
  const params: AddStudentParamsDto = req.body;

  try {
    await addStudent(params);
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error });
  }
};
