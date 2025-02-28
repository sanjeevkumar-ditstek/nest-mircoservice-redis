import {
  Controller,
  Get,
  Post,
  Inject,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('proxy') // API Gateway will use /proxy/{service}/{action}
export class ProxyController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('ASSESSMENT_SERVICE')
    private readonly assessmentClient: ClientProxy,
  ) {}

  private getClient(service: string): ClientProxy {
    switch (service) {
      case 'user':
        return this.userClient;
      case 'assessment':
        return this.assessmentClient;
      default:
        throw new Error('Unknown service');
    }
  }

  @Get(':service/:action') // Dynamic GET requests
  proxyGetRequest(
    @Param('service') service: string,
    @Param('action') action: string,
    @Query() params: any,
  ) {
    const client = this.getClient(service);
    return client.send(action, params);
  }

  @Post(':service/:action') // Dynamic POST requests
  proxyPostRequest(
    @Param('service') service: string,
    @Param('action') action: string,
    @Body() payload: any,
  ) {
    const client = this.getClient(service);
    return client.send(action, payload); // Send body data to microservice
  }
}
