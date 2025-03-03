import { ArgumentsHost, Catch, RpcExceptionFilter, BadRequestException } from '@nestjs/common';
import { throwError } from 'rxjs';

@Catch(BadRequestException)
export class RpcValidationFilter implements RpcExceptionFilter<BadRequestException> {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const exceptionResponse = exception.getResponse();
    return throwError(() => ({
      status: 400,
      error: 'Validation Error',
      message: exceptionResponse['message'] || 'Invalid data',
    }));
  }
}
