import express from 'express';
import authenticate from '../middlewares/authenticate.middleware';
import { UserType } from '../utils';
import {
  addStudentController,
  getStudentTaskDetailsController,
  getStudentTasksController,
  updateStudentTaskStatusController,
} from '../controllers/student.controller';
import { validateDto } from '../middlewares/validate-dto.middleware';
import { AddStudentParamsDto, UpdateTaskStatusParamsDto } from '../utils/dtos';

const router = express.Router();

router.post(
  '/',
  authenticate(UserType.admin),
  validateDto(AddStudentParamsDto),
  addStudentController,
);

router.get('/tasks', authenticate(UserType.student), getStudentTasksController);

router.get(
  '/tasks/:taskId',
  authenticate(UserType.student),
  getStudentTaskDetailsController,
);

router.patch(
  '/tasks/:taskId',
  authenticate(UserType.student),
  validateDto(UpdateTaskStatusParamsDto),
  updateStudentTaskStatusController,
);

export default router;
