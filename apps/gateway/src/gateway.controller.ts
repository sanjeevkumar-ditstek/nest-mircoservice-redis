import {
  Controller,
  Get,
  Post,
  Inject,
  Param,
  Query,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, catchError, map } from 'rxjs';
import { handleMicroserviceError } from './error-handler/gateway.error-handler'; // Import error handler

@Controller('proxy')
export class ProxyController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('ASSESSMENT_SERVICE') private readonly assessmentClient: ClientProxy,
    @Inject('GENERAL_SERVICE') private readonly generalClient: ClientProxy,
  ) {}

  private getClient(service: string): ClientProxy {
    switch (service) {
      case 'user':
        return this.userClient;
      case 'assessment':
        return this.assessmentClient;
      case 'notification':
        return this.generalClient;
      default:
        throw new BadRequestException({
          status: 'error',
          message: 'Unknown service',
        });
    }
  }

  @Get(':service/:action')
  async proxyGetRequest(
    @Param('service') service: string,
    @Param('action') action: string,
    @Query() params: any,
  ) {
    const client = this.getClient(service);

    return firstValueFrom(
      client.send(action, params).pipe(
        map((data) => ({
          status: 'success',
          message: 'Request processed successfully',
          data,
        })),
        catchError(handleMicroserviceError), // Use custom error handler
      ),
    );
  }

  @Post(':service/:action')
  async proxyPostRequest(
    @Param('service') service: string,
    @Param('action') action: string,
    @Body() payload: any,
  ) {
    const client = this.getClient(service);

    return firstValueFrom(
      client.send(action, payload).pipe(
        map((data) => ({
          status: 'success',
          message: 'Request processed successfully',
          data,
        })),
        catchError(handleMicroserviceError), // Use custom error handler
      ),
    );
  }
}
