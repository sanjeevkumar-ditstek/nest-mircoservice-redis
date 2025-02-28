import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

/**
 * Common function to apply Helmet security headers
 */
export function applyHelmet(req: Request, res: Response, next: NextFunction) {
  return helmet()(req, res, next);
}
