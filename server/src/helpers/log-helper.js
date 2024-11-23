import winston from 'winston';
import 'winston-daily-rotate-file';
import { formatDate } from '../services/date-service.js';

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'storage/logs/application.log',
            format: winston.format.printf((info) => {
                return `[${formatDate(new Date())}] ${info.level.toUpperCase()}: ${info.message}`;
            }),
        }),
        new winston.transports.File({ 
            filename: 'storage/logs/exception.log', 
            handleExceptions: true,
            level: 'error',
            format: winston.format.printf((info) => {
                return `[${formatDate(new Date())}] ${info.level.toUpperCase()}: ${JSON.stringify(info)}`;
            }),
        }),
    ]
});

const requestLogger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'storage/logs/requests/request-' + formatDate(new Date(), 'Y-m-d') + '.log',
            format: winston.format.printf((info) => {
                return `[${formatDate(new Date())}] ${info.message}`;
            }),
        })
    ]
});

export { logger, requestLogger };