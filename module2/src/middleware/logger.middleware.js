import { API_DOCS_STRING } from "../util/constants.js";
import { logger } from "../util/logger.js";

/**
 * should have request_uuid for better tracing of logs
 */
export const loggerMiddleware = (req, res, next) => {
    const { method, originalUrl, body, params, query } = req;
    /**
     * skip logging for api docs 
     */
    if (originalUrl.includes(API_DOCS_STRING)) return next();
    /**
     * log request
     */
    logger.info(`[${method}][${originalUrl}] - ` +
        `Request Body: ${JSON.stringify(body)} Params: ${JSON.stringify(params)} ` +
        `Query: ${JSON.stringify(query)}`);
    next();
}

export const responseLoggerMiddleware = (req, res) => {
    const { method, originalUrl, responsePayload } = req;
    /**
     * log response
     */
    logger.info(`[${method}][${originalUrl}] - ` +
        `Response Body: ${JSON.stringify(responsePayload)}`);
    const { code, data, message } = responsePayload

    return res.status(code).json({
        data, message
    });
}