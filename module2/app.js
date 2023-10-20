
import dotenv from 'dotenv';
import express from "express";
import { startDatabase } from './src/util/connection.js';

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
app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));