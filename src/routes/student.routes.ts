import express from 'express';
import authenticate from '../middlewares/authenticate.middleware';
import { UserType, AddStudentParamsDto, AssignTaskParamsDto } from '../utils';
import {
  addStudentController,
  getStudentsController,
  getStudentTaskDetailsController,
  getStudentTasksController,
  completeStudentTaskController,
  assignStudentTaskController,
} from '../controllers/student.controller';
import { validateDto } from '../middlewares/validate-dto.middleware';

const router = express.Router();

router.post(
  '/',
  authenticate(UserType.admin),
  validateDto(AddStudentParamsDto),
  addStudentController,
);

router.get('/', authenticate(UserType.admin), getStudentsController);

router.get('/task', authenticate(UserType.student), getStudentTasksController);

router.post(
  '/:email/task',
  authenticate(UserType.admin),
  validateDto(AssignTaskParamsDto),
  assignStudentTaskController,
);

router.get(
  '/task/:taskId',
  authenticate(UserType.student),
  getStudentTaskDetailsController,
);

router.patch(
  '/task/:taskId',
  authenticate(UserType.student),
  completeStudentTaskController,
);

export default router;
