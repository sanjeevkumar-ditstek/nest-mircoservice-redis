import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('getUser') // Listens for 'getUser' message
  getUser(@Payload() data: { id: number }): Promise<any> {
    console.log('id', data.id);
    return this.userService.getUserById(data.id);
  }
}
