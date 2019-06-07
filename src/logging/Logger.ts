import {createLogger, format, transports} from "winston";

const baseLogFormat = format.combine(
    format.timestamp({
        format: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSZ'
    }),
    format.errors({stack: true}),
    format.splat(),
);

const localLogFormat = format.combine(
    baseLogFormat,
    format.simple()
);

const logger = createLogger({
    level: "info",
    format: localLogFormat,
    defaultMeta: {service: 'matrix-reduction'},
    transports: [
        new transports.File({
            dirname: "logs",
            filename: "matrix.log",
            maxsize: 4096
        })
    ]
});

export default logger;