import { logger } from "../util/logger.js";


export const loggerMiddleware = (req, res, next) => {
    const { method, originalUrl, body, params, query } = req
    logger.info(`[${method}][${originalUrl}] - ` +
        `BODY: ${JSON.stringify(body)} PARAMS: ${JSON.stringify(params)} ` +
        `QUERY STRINGS: ${JSON.stringify(query)}`);
    next();
}