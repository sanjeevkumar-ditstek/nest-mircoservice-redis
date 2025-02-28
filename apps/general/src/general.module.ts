import { Module } from '@nestjs/common';
import { GeneralServiceController } from './general.controller';
import { GeneralServiceService } from './general.service';

@Module({
  imports: [],
  controllers: [GeneralServiceController],
  providers: [GeneralServiceService],
})
export class GeneralServiceModule {}
