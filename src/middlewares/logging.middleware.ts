import { Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { logger } from '../config/logger';
import { CustomRequest } from '../types/request';

export function loggingMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void {
  const start = process.hrtime();
  
  // Extract or generate Correlation ID
  const correlationId = (req.headers['x-correlation-id'] as string) || randomUUID();
  req.correlationId = correlationId;

  // Add Correlation ID to response headers
  res.setHeader('X-Correlation-Id', correlationId);

  // Log Request Start
  logger.info({
    method: req.method,
    correlationId,
    message: `Request started: ${req.method} ${req.url}`
  });

  // Intercept Response End to Log Completion
  res.on('finish', () => {
    const diff = process.hrtime(start);
    const ms = Math.round((diff[0] * 1e9 + diff[1]) / 1e6); // Convert nanoseconds to milliseconds

    logger.info({
      method: req.method,
      correlationId,
      message: `Request completed: ${req.method} ${req.url} - Status ${res.statusCode} in ${ms}ms`,
      ms
    });
  });

  next();
}
