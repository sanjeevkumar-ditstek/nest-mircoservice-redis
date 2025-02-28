import { Injectable } from '@nestjs/common';

@Injectable()
export class GeneralServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
