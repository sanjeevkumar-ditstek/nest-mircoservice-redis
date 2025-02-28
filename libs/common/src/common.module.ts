import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { SecurityMiddleware } from './middleware/security.middleware';

@Module({
  imports: [DatabaseModule],
  providers: [SecurityMiddleware],
  exports: [DatabaseModule, SecurityMiddleware],
})
export class CommonModule {}
