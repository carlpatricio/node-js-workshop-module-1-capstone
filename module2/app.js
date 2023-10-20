
import dotenv from 'dotenv';
import express from "express";

dotenv.config();
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