import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';
import { RpcValidationFilter } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.REDIS,
      options: { host: 'localhost', port: 6379 },
    },
  );

  // Apply the global exception filter
  app.useGlobalFilters(new RpcValidationFilter());

  await app.listen();
  console.log('🚀 User Service is running...');
}

void bootstrap();
