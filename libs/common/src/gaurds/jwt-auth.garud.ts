import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {} // Inject ConfigService

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToRpc().getData(); // Get request payload
    const token = request?.headers?.authorization?.split(' ')[1]; // Extract token

    if (!token) {
      throw new RpcException({ status: 'error', message: 'Unauthorized' });
    }

    try {
      // const jwtSecret = this.configService.get<string>('JWT_SECRET'); // Fetch from .env
      const decoded = jwt.verify(token, '1234');
      request.user = decoded; // Attach user to request
      return true;
    } catch (error) {
      throw new RpcException({ status: 'error', message: 'Invalid token' });
    }
  }
}
