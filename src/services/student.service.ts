import { IUser } from '../models/user.model';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import {
  TaskStatus,
  UserType,
  AddStudentParamsDto,
  PageOptionsDto,
  AssignTaskParamsDto,
} from '../utils';
import {
  assignTask,
  getTask,
  getTasks,
  updateTaskStatus,
} from './task.service';

export const addStudent = async (params: AddStudentParamsDto) => {
  try {
    const { name, email, password, department } = params;

    // Check if student already exists
    const existingStudent = await User.findOne({
      email,
      type: UserType.student,
    });
    if (existingStudent) {
      return {
        status: 409,
        message: 'Student already exists',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await User.create({
      name,
      email,
      password: hashedPassword,
      type: UserType.student,
      department,
    });

    return {
      status: 201,
      message: 'Student added successfully',
      student,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Error adding student',
      error,
    };
  }
};

export const getStudents = async (pageOptions: PageOptionsDto) => {
  try {
    const list = await User.find(
      {
        type: UserType.student,
      },
      {
        name: 1,
        email: 1,
        department: 1,
        createdAt: 1,
        updatedAt: 1,
      },
      {
        skip: pageOptions.skip,
        limit: pageOptions.limit,
        sort: { createdAt: -1 },
      },
    )
      .lean()
      .exec();

    const itemCount = await User.countDocuments({
      type: UserType.student,
    });

    return {
      status: 200,
      message: 'Students retrieved successfully',
      itemCount,
      list,
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Error getting students',
      error,
    };
  }
};

export const getStudentTasks = async (
  email: string,
  pageOptions: PageOptionsDto,
) => {
  try {
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
  } catch (error) {
    return {
      status: 500,
      message: 'Error getting tasks',
      error,
    };
  }
};

export const getStudentTask = async (taskId: string, email: string) => {
  try {
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

    return getTask(user._id, taskId);
  } catch (error) {
    return {
      status: 500,
      message: 'Error getting task',
      error,
    };
  }
};

export const completeStudentTask = async (taskId: string, email: string) => {
  try {
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

    return updateTaskStatus(user._id, taskId, TaskStatus.completed);
  } catch (error) {
    return {
      status: 500,
      message: 'Error updating task status',
      error,
    };
  }
};

export const assignStudentTask = async (
  email: string,
  task: AssignTaskParamsDto,
) => {
  try {
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

    return assignTask(user._id, task);
  } catch (error) {
    return {
      status: 500,
      message: 'Error assigning task',
      error,
    };
  }
};
