import { Controller, BadRequestException } from '@nestjs/common';
import { CrudService } from './crud.service';
import { Document } from 'mongoose';
import Joi from 'joi';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { JoiValidationPipe } from '../validations/joi-validation.pipe';

@Controller()
export class CrudController<T extends Document> {
  constructor(
    private readonly service: CrudService<T>,
    private readonly validationSchemas: Record<string, Joi.ObjectSchema>,
  ) {}

  @MessagePattern('create') // Message Pattern instead of HTTP Route
  // @UsePipes(new JoiValidationPipe(createUserSchema))
  async create(@Payload() data: Partial<T>): Promise<T> {
    const { error } = this.validationSchemas['create'].validate(data);
    console.log('error', error);
    if (error) {
      // Extract error messages
      const errors = error.details.map((err) => ({
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
    return this.service.create(data);
  }
}
