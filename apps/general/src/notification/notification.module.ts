import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { CommonConfigModule, DatabaseModule, Notification, NotificationSchema } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    DatabaseModule,
    CommonConfigModule,
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}

