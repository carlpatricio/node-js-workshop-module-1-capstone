import { logger } from "../util/logger.js";

export const handleError = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    /**
     * stacktrace will only be included in local development - dev
     */
    const stackTrace = process.env.NODE_ENV === 'dev' ? err.stack : undefined;
    res.status(statusCode).json({
        message: err.message,
        stackTrace
    });
    logger.error(`${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${err.stack}`);
};
