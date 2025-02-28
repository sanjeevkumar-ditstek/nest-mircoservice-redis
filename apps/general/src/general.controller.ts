import { Controller, Get } from '@nestjs/common';
import { GeneralServiceService } from './general.service';

@Controller()
export class GeneralServiceController {
  constructor(private readonly generalServiceService: GeneralServiceService) {}

  @Get()
  getHello(): string {
    return this.generalServiceService.getHello();
  }
}
