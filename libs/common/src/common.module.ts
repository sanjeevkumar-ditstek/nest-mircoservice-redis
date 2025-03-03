import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { AppLogger } from './logger/logger.service';
import { CrudModule } from './crud/crud.module';
import { CrudService } from './crud/crud.service';

@Module({
  imports: [DatabaseModule , CrudModule],
  exports: [DatabaseModule, AppLogger, CrudModule], // Re-export CrudModule
  providers: [AppLogger],
})
export class CommonModule {}
