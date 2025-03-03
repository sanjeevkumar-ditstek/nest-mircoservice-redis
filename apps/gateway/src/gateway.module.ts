import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProxyController } from './gateway.controller';

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
      {
        name: 'GENERAL_SERVICE',
        transport: Transport.REDIS,
        options: { host: 'localhost', port: 6379,
        },
      },
    ]),
  ],
  controllers: [ProxyController],
})
export class ApiGatewayModule {}
