
import dotenv from 'dotenv';
import express from "express";
import { startDatabase } from './src/util/connection.js';
import { logger } from './src/util/logger.js';
import { handleUnknownRoutes } from './src/util/util.js';

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

/**
 * routes
 */
/**
 * unknown routes handler
 */
app.use('*', handleUnknownRoutes);
app.use(express.json());
app.listen(PORT, () => logger.info(`Server running at port : ${PORT}`));