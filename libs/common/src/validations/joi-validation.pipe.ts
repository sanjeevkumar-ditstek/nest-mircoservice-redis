import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema, ValidationResult } from 'joi';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JoiValidationPipe<T> implements PipeTransform {
  constructor(private readonly schema: ObjectSchema<T>) {}

  transform(value: unknown, metadata: ArgumentMetadata): T {
    const validationResult: ValidationResult<T> = this.schema.validate(value, {
      abortEarly: false, // Return all validation errors
      stripUnknown: true, // Remove unknown properties
    });

    if (validationResult.error) {
      // Extract error messages
      const errors = validationResult.error.details.map((err) => ({
        field: err.path.join('.'),
        message: err.message.replace(/['"]/g, ''), // Remove extra quotes
      }));

      // If running in a microservice, use RpcException instead of HttpException
      throw new RpcException({
        status: 'error',
        message: 'Validation failed',
        response: errors,
      });
    }

    return validationResult.value as T;
  }
}
