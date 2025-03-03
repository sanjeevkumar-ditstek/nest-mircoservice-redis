import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GeneralServiceModule } from './general.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GeneralServiceModule,
    {
      transport: Transport.REDIS,
      options: { host: 'localhost', port: 6379 },
    },
  );
  await app.listen();
  console.log('🚀 General Service is running...');
}
void bootstrap();
