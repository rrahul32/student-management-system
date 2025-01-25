import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validateDto = <T extends object>(
  dtoClass: ClassConstructor<T>,
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const validationErrors = errors.map((err) =>
        Object.values(err.constraints || {}).join(', '),
      );
      res
        .status(400)
        .json({ message: 'Validation error', errors: validationErrors });
      return;
    }

    next();
  };
};
