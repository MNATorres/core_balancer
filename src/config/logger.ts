import pino from 'pino';
import pretty from 'pino-pretty';

// Configure pretty stream for development (runs in main thread to allow function formatting)
const prettyStream = pretty({
  colorize: true,
  ignore: 'pid,hostname,time,level,date,method,correlationId,message,ms,route',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messageFormat: (log: any, messageKey: string) => {
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const rawLevel = log.level;
    let coloredLevel = '[INFO]';
    
    if (rawLevel === 30 || rawLevel === '30' || rawLevel === 'INFO') {
      coloredLevel = '\x1b[32m[INFO]\x1b[0m'; // Green
    } else if (rawLevel === 50 || rawLevel === '50' || rawLevel === 'ERROR') {
      coloredLevel = '\x1b[31m[ERROR]\x1b[0m'; // Red
    } else if (rawLevel === 40 || rawLevel === '40' || rawLevel === 'WARN') {
      coloredLevel = '\x1b[33m[WARN]\x1b[0m'; // Yellow
    } else if (rawLevel === 20 || rawLevel === '20' || rawLevel === 'DEBUG') {
      coloredLevel = '\x1b[34m[DEBUG]\x1b[0m'; // Blue
    }
    
    const cid = log.correlationId ? `\x1b[36m(CID: ${log.correlationId})\x1b[0m` : '';
    const method = log.method ? `\x1b[33m[${log.method.toUpperCase()}]\x1b[0m` : '';
    const route = log.route ? `\x1b[35m${log.route}\x1b[0m` : '';
    const msg = log[messageKey] || log.message || log.msg || '';
    const msStr = log.ms !== undefined ? ` \x1b[32m+${log.ms}ms\x1b[0m` : '';
    
    return `[${dateStr}] ${coloredLevel} ${cid} ${method} ${route} - ${msg}${msStr}`;
  }
});

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || 'info',
    messageKey: 'message',
    timestamp: () => `,"date":"${new Date().toISOString()}"`,
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
    },
  },
  process.env.NODE_ENV !== 'production' ? prettyStream : undefined
);
