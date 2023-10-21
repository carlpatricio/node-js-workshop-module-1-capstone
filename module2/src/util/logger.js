
import dotenv from 'dotenv';
import { createLogger, format, transports } from 'winston';
import { LOGGER_TIMESTAMP_FORMAT } from './constants.js';

dotenv.config();
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
const transportChannels = (process.env.NODE_ENV === 'prod') ?
    [
        new transports.File({ filename: './log/error.log', level: 'error' }),
        new transports.File({ filename: './log/debug.log' }),
        new transports.Console({ format: format.simple() })
    ]
    : [
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
