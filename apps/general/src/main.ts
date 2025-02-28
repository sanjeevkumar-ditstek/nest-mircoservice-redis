import { NestFactory } from '@nestjs/core';
import { GeneralServiceModule } from './general.module';

async function bootstrap() {
  const app = await NestFactory.create(GeneralServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
