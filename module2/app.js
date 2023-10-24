
import dotenv from 'dotenv';
import express from "express";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { handleError, loggerMiddleware, responseLoggerMiddleware } from './src/middleware/index.js';
import { sensorDataRouter } from './src/routes/index.js';
import { handleUnknownRoutes, logger, startDatabase } from './src/util/index.js';

const swaggerDocument = YAML.load('./doc/swagger.yaml')
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
app.use(loggerMiddleware);
/**
 * API doc
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/**
 * routes
 */
app.use('/api', sensorDataRouter);
/**
 * unknown routes handler
 */
app.use('*', handleUnknownRoutes);
app.use(responseLoggerMiddleware);
app.use(handleError); /** Handle global error for express app */
app.listen(PORT, () => logger.info(`Server running at port : ${PORT}`));