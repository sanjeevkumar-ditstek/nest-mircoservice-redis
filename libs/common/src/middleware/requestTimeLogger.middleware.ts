import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Utility function to log request time if it exceeds a threshold
const logRequestTime = (req: Request, res: Response, threshold: number = 30000) => {
  const startTime = Date.now(); // Start time of the request

  // Log the time when the response finishes
  res.on('finish', () => {
    const endTime = Date.now();
    const duration = endTime - startTime; // Calculate the duration of the request

    if (duration > threshold) { // Check if request took longer than the threshold
      console.log(`Request to ${req.originalUrl} took ${duration / 1000} seconds.`);
    }else{
        console.log(`Request to ${req.originalUrl} took ${duration / 1000} seconds.`);
    }
  });
};

@Injectable()
export class RequestTimeLoggerMiddleware implements NestMiddleware {
    
    use(req: Request, res: Response, next: NextFunction): void {
    // Call the function to log request time
    logRequestTime(req, res);

    // Proceed to the next middleware or route handler
    next();
  }
}
