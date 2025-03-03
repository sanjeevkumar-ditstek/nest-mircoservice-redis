import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { Notification, NotificationSchema, User, UserSchema } from '../db/schemas';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
  ],
  providers: [CrudService],
  controllers: [CrudController],
  exports: [CrudService],  // Export so microservices can use it
  
})
export class CrudModule {}


