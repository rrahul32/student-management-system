import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Department } from '../constants';

export class AddStudentParamsDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEnum(Department)
  department: Department;
}
