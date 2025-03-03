import { Controller} from '@nestjs/common';
import { CrudController , ResponseMessages, NotificationDocument} from '@app/common'
import { NotificationService } from './notification.service';
import { notifyValidationSchemas} from './validation/notification.validation'
import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller()
export class NotificationController extends CrudController<NotificationDocument> {
  constructor(private readonly notificationService: NotificationService) {
    super(notificationService , notifyValidationSchemas);
  }
}
