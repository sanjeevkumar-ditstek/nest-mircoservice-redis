import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProxyController } from './proxy/proxy.controller';
import { SecurityMiddleware, RequestTimeLoggerMiddleware } from '@app/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.REDIS,
        options: { host: 'localhost', port: 6379 },
      },
      {
        name: 'ASSESSMENT_SERVICE',
        transport: Transport.REDIS,
        options: { host: 'localhost', port: 6379 },
      },
    ]),
  ],
  controllers: [ProxyController],
})
export class ApiGatewayModule {

  configure(consumer: MiddlewareConsumer) {    
    consumer
      .apply(SecurityMiddleware)
      .forRoutes('*'); // Apply globally

    consumer
      .apply(RequestTimeLoggerMiddleware)
      .forRoutes('*'); // Apply globally

    // Debugging to ensure middleware is applied
    console.log('Middlewares applied for all routes.');
  }
}
