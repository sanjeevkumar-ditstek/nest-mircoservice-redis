import { Controller } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @MessagePattern('getAssessment')
  getAssement(@Payload() data: { id: number }): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.assessmentService.getAssessment(data.id);
  }
}
