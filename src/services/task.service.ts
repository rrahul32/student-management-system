import { Types } from 'mongoose';
import Task from '../models/task.model';
import { AssignTaskParamsDto, PageOptionsDto, TaskStatus } from '../utils';

export const assignTask = async (
  studentId: Types.ObjectId,
  params: AssignTaskParamsDto,
) => {
  try {
    const { title, description, dueDate } = params;

    const task = await Task.create({
      title,
      description,
      dueDate,
      status: TaskStatus.pending,
      assignedTo: studentId,
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
        sort: { createdAt: -1 },
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

export const updateOverdueTasks = async () => {
  const now = new Date();
  const updateResult = await Task.updateMany(
    {
      dueDate: { $lt: now },
      status: TaskStatus.pending,
    },
    {
      status: TaskStatus.overdue,
    },
  );

  if (updateResult.modifiedCount) {
    console.log(
      `${updateResult.modifiedCount} overdue tasks updated successfully`,
    );
  }
};
