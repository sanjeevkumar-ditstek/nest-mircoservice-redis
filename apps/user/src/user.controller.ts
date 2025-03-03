import { BadRequestException, Controller, UseGuards, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { JoiValidationPipe } from '@app/common';
import { createUserSchema } from './validation/user.validation';
import {ResponseMessages} from '@app/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('getUser') // Listens for 'getUser' message
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async getUser(@Payload() data: { id: number }): Promise<any> {
      console.log('id', data.id);
      let responseData = await this.userService.getUserById(data.id);
      if(responseData){
        throw new BadRequestException('Error registering user');
      }
      return {message:ResponseMessages.USER_REGISTRATION, data:responseData}
    } 
}
