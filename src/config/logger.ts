import pino from 'pino';

// Configure Pino Logger
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  // Custom timestamp field named "date" in ISO format
  timestamp: () => `,"date":"${new Date().toISOString()}"`,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  // Use pino-pretty for development console output
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
      messageFormat: '[{method}] (CID: {correlationId}) {message}'
    }
  } : undefined
});
