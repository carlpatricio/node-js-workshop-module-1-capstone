
import { createLogger, format, transports } from 'winston';
import { LOGGER_TIMESTAMP_FORMAT } from './constants.js';

/**
 * logger configs
 */
const loggerFormat = format.combine(
    format.timestamp({
        format: LOGGER_TIMESTAMP_FORMAT
    }),
    format.colorize(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
);
/**
 * output channels
 */
const transportChannels = [
    new transports.Console({ format: format.simple() })
];
/**
 * logger instance
 */
export const logger = createLogger({
    level: 'info',
    format: loggerFormat,
    transports: transportChannels
});
