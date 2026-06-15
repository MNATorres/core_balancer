import { Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { CustomRequest } from '../types/request';

export function errorMiddleware(
  err: unknown,
  req: CustomRequest,
  res: Response,
  _next: NextFunction
): void {
  const correlationId = req.correlationId || 'N/A';
  const errorMessage = err instanceof Error ? err.message : String(err);
  const errorStack = err instanceof Error ? err.stack : undefined;

  // Log Error with correlation ID and Stack Trace
  logger.error({
    method: req.method,
    correlationId,
    message: `Request failed: ${req.method} ${req.url} - Error: ${errorMessage}`,
    err: {
      message: errorMessage,
      stack: errorStack
    }
  });

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    correlationId,
    error: errorMessage
  });
}
