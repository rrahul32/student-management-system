import mongoose, { Schema, Types } from 'mongoose';
import { TaskStatus } from '../utils';
import userModel from './user.model';

export interface ITask {
  _id: Types.ObjectId;
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  assignedTo: Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: Object.values(TaskStatus),
    default: TaskStatus.pending,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: userModel.name,
    required: true,
  },
});

export default mongoose.model<ITask>('Task', taskSchema);
