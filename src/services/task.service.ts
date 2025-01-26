import { Types } from 'mongoose';
import Task from '../models/task.model';
import User from '../models/user.model';
import { TaskStatus, UserType } from '../utils';
import { AssignTaskParamsDto, PageOptionsDto } from '../utils/dtos';

export const assignTask = async (params: AssignTaskParamsDto) => {
  try {
    const { title, description, dueDate } = params;

    const user = await User.findOne({
      email: params.studentEmail,
    });
    if (!user || user.type !== UserType.student) {
      return {
        status: 404,
        message: 'Student not found',
      };
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      status: TaskStatus.pending,
      assignedTo: user._id,
    });

    return {
      status: 201,
      message: 'Task assigned successfully',
      task,
    };
  } catch (err) {
    return {
      status: 500,
      message: 'Error assigning task',
      error: err,
    };
  }
};

export const getTasks = async (
  studentId: Types.ObjectId,
  pageOptions: PageOptionsDto,
) => {
  try {
    const list = await Task.find(
      {
        assignedTo: studentId,
      },
      {},
      {
        skip: pageOptions.skip,
        limit: pageOptions.limit,
      },
    )
      .lean()
      .exec();

    const itemCount = await Task.countDocuments({
      assignedTo: studentId,
    });
    return {
      status: 200,
      message: 'Tasks retrieved successfully',
      itemCount,
      list: list.map((task) => ({
        id: task._id.toString(),
        title: task.title,
        status: task.status,
      })),
    };
  } catch (err) {
    return {
      status: 500,
      message: 'Error getting tasks',
      error: err,
    };
  }
};

export const getTask = async (studentId: Types.ObjectId, taskId: string) => {
  try {
    const task = await Task.findById(Types.ObjectId.createFromHexString(taskId))
      .lean()
      .exec();
    if (!task) {
      return {
        status: 404,
        message: 'Task not found',
      };
    }

    if (task.assignedTo.toString() !== studentId.toString()) {
      return {
        status: 403,
        message: 'You are not authorized to access this task',
      };
    }

    return {
      status: 200,
      message: 'Task retrieved successfully',
      task,
    };
  } catch (err) {
    return {
      status: 500,
      message: 'Error getting task',
      error: err,
    };
  }
};

export const updateTaskStatus = async (
  studentId: Types.ObjectId,
  taskId: string,
  status: TaskStatus,
) => {
  try {
    const task = await Task.findById(
      Types.ObjectId.createFromHexString(taskId),
    );

    if (!task) {
      return {
        status: 404,
        message: 'Task not found',
      };
    }

    if (task.assignedTo.toString() !== studentId.toString()) {
      return {
        status: 403,
        message: 'You are not authorized to access this task',
      };
    }

    task.status = status;
    const updatedTask = (await task.save()).toObject();

    return {
      status: 200,
      message: 'Task updated successfully',
      task: updatedTask,
    };
  } catch (err) {
    return {
      status: 500,
      message: 'Error updating task',
      error: err,
    };
  }
};
