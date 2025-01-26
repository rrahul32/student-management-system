import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { TaskStatus } from '../constants';

export class AssignTaskParamsDto {
  @IsAlphanumeric()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @Type(() => Date)
  dueDate: Date;

  @IsEmail()
  studentEmail: string;
}

export class UpdateTaskStatusParamsDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
