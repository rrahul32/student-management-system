import express from 'express';
import authenticate from '../middlewares/authenticate.middleware';
import { UserType } from '../utils';
import {
  addStudentController,
  getStudentTasksController,
} from '../controllers/student.controller';
import { validateDto } from '../middlewares/validate-dto.middleware';
import { AddStudentParamsDto } from '../utils/dtos';

const router = express.Router();

router.post(
  '/',
  authenticate(UserType.admin),
  validateDto(AddStudentParamsDto),
  addStudentController,
);

router.post(
  '/tasks',
  authenticate(UserType.admin),
  validateDto(AddStudentParamsDto),
  getStudentTasksController,
);

export default router;
