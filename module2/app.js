
import dotenv from 'dotenv';
import express from "express";
import { handleError, loggerMiddleware } from './src/middleware/index.js';
import { handleUnknownRoutes, logger, startDatabase } from './src/util/index.js';

dotenv.config();
startDatabase();
/**
 * env vars
 */
const PORT = process.env.SERVER_PORT ?? 1313;
/**
 * create express app
 */
const app = express();
/**
 * middleware
 */
app.use(express.json());
app.use(loggerMiddleware)
/**
 * routes
 */
/**
 * unknown routes handler
 */
app.use('*', handleUnknownRoutes);
app.use(handleError); /** Handle global error for express app */
app.listen(PORT, () => logger.info(`Server running at port : ${PORT}`));