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

  const method = req.method;
  const route = req.originalUrl || req.url;

  // Log Request Start using standard Pino (metadata, message) signature
  logger.info(
    { method, route, correlationId },
    '--> Request Started'
  );

  // Intercept Response End to Log Completion
  res.on('finish', () => {
    const diff = process.hrtime(start);
    const ms = Math.round((diff[0] * 1e9 + diff[1]) / 1e6); // Convert nanoseconds to milliseconds

    logger.info(
      { method, route, correlationId, ms },
      `<-- Request Completed (Status ${res.statusCode})`
    );
  });

  next();
}
