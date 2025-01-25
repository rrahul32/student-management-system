import { IUser } from '../models/user.model';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import { AddStudentParamsDto, PageOptionsDto } from '../utils/dtos';
import { UserType } from '../utils';
import { getTasks } from './task.service';

export const addStudent = async (
  params: AddStudentParamsDto,
): Promise<IUser> => {
  const { name, email, password, department } = params;

  const hashedPassword = await bcrypt.hash(password, 10);
  const student = await User.create({
    name,
    email,
    password: hashedPassword,
    type: UserType.student,
    department,
  });

  return student;
};

export const getStudentTasks = async (
  email: string,
  pageOptions: PageOptionsDto,
) => {
  const user: IUser | null = await User.findOne({
    email,
    type: UserType.student,
  }).exec();
  if (!user) {
    return {
      status: 404,
      message: 'Student not found',
    };
  }

  return getTasks(user._id, pageOptions);
};
