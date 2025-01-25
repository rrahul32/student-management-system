import { ADMIN_CREDENTIALS } from '../config/admin';
import jwt from 'jsonwebtoken';
import { UserType } from '../utils';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

export const loginAdmin = async (email: string, password: string) => {
  if (
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
    const token = jwt.sign(
      { email, type: UserType.admin },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h',
      },
    );
    return {
      status: 200,
      message: 'Login successful',
      token,
    };
  }

  return {
    status: 401,
    message: 'Invalid email or password',
  };
};

export const loginStudent = async (email: string, password: string) => {
  const student = await User.findOne({ email, type: UserType.student });
  if (!student) {
    return {
      status: 401,
      message: 'Invalid email',
    };
  }

  const isPasswordValid = await bcrypt.compare(password, student.password);
  if (!isPasswordValid) {
    return {
      status: 401,
      message: 'Invalid password',
    };
  }

  const token = jwt.sign(
    { email, type: UserType.student },
    process.env.JWT_SECRET!,
    {
      expiresIn: '1h',
    },
  );
  return {
    status: 200,
    message: 'Login successful',
    token,
  };
};
