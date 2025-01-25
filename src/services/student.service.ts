import { IUser } from '../models/user.model';
import { AddStudentParamsDto } from '../utils/dtos/student.dto';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

export const addStudent = async (
  params: AddStudentParamsDto,
): Promise<IUser> => {
  const { name, email, password, department } = params;

  const hashedPassword = await bcrypt.hash(password, 10);
  const student = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'student',
    department,
  });

  return student;
};
