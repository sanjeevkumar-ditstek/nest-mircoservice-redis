import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  // eslint-disable-next-line
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserById(id: number): Promise<any> {
    console.log('id', id);
    return this.userModel.find().exec();
  }
}
