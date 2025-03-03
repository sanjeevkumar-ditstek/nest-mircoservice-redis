import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@app/common'
import { AppLogger } from '@app/common';



@Injectable()
export class UserService {
  // eslint-disable-next-line
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly logger: AppLogger,
  ) {}

  async getUserById(id: number): Promise<any> {
    console.log('id', id);
    this.logger.log('Microservice log entry');
    this.logger.error('Microservice error log', { error: 'Error details' });
    let result = await this.userModel.find({name:"ranjana"}).exec();
    console.log('result: ', result);
    return result
  }
}
