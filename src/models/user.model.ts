import mongoose, { Schema, Document } from 'mongoose';
import { Department, UserType } from '../utils';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  type: UserType;
  department?: Department;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true, enum: Object.values(UserType) },
  department: { type: String, enum: Object.values(Department) },
});

export default mongoose.model<IUser>('User', userSchema);
