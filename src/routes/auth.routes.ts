import express from 'express';
import {
  adminLoginController,
  studentLoginController,
} from '../controllers/auth.controller';
import { validateDto } from '../middlewares/validate-dto.middleware';
import { LoginParamsDto } from '../utils/dtos';

const router = express.Router();

router.post('/admin/login', validateDto(LoginParamsDto), adminLoginController);
router.post(
  '/student/login',
  validateDto(LoginParamsDto),
  studentLoginController,
);

export default router;
