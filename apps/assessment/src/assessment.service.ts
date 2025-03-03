import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AssessmentService {
  constructor(
    @Inject('ASSESSMENT_SERVICE') private readonly userClient: ClientProxy,
  ) {}
  async getAssessment(assessmentId: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const user = await this.userClient.send('getUser', { id: 1 }).toPromise();

    return {
      assessmentId,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      user, // Attach user details inside the assessment
      details: 'This is assessment details',
    };
  }
}
