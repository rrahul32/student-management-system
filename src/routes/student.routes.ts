import express from 'express';
import { adminLoginController } from '../controllers/auth.controller';
import authenticate from '../middlewares/authenticate.middleware';
import { UserType } from '../utils';

const router = express.Router();

router.use(authenticate(UserType.admin));

router.post('/admin/login', adminLoginController);

export default router;
