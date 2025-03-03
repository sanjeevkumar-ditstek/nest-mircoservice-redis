import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { throwError } from 'rxjs';

export function handleMicroserviceError(error: any) {
  console.error('Microservice Error:', error);

  if (error?.response) {
    // Structured error from microservice (validation, business logic, etc.)
    return throwError(
      () =>
        new BadRequestException({
          status: 'error',
          message: error?.message || 'Microservice error',
          errors: error?.response || null,
        }),
    );
  } else {
    // Internal Server Error
    return throwError(
      () =>
        new InternalServerErrorException({
          status: 'error',
          message: 'Internal server error',
          details: error?.message || 'Unexpected error occurred',
        }),
    );
  }
}
