import { Injectable } from '@nestjs/common';
import { Notification, NotificationDocument , CrudService } from '@app/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NotificationService extends CrudService<NotificationDocument> {
  constructor(@InjectModel(Notification.name) model: Model<NotificationDocument>) {
    super(model);
  }
}
