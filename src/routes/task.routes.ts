import express from 'express';
import authenticate from '../middlewares/authenticate.middleware';
import { UserType, AssignTaskParamsDto } from '../utils';
import { assignTaskController } from '../controllers/task.controller';
import { validateDto } from '../middlewares/validate-dto.middleware';

const router = express.Router();

router.post(
  '/',
  authenticate(UserType.admin),
  validateDto(AssignTaskParamsDto),
  assignTaskController,
);

export default router;
