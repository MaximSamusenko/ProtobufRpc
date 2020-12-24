import { createLogger, transports, format } from 'winston';

export default function loggerFor(name: string) {    
    return createLogger({
        level: 'debug',
        handleExceptions: true,                
        transports: [new transports.Console()],
        format: format.combine(
            format.colorize(),
            format.label({ label: name }),
            format.timestamp(),
            format.printf(({ level, message, label, timestamp }) => {
                return `${timestamp} [${label}] ${level}: ${message}`;
            })
        )
    });
};