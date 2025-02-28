import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AssessmentModule } from './assessment.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AssessmentModule,
    {
      transport: Transport.REDIS,
      options: { host: 'localhost', port: 6379 },
    },
  );
  await app.listen();
  console.log('🚀 Assessment Service is running...');
}
void bootstrap();
