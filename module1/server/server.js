import dotenv from 'dotenv';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { WebSocketServer } from 'ws';
import { CSV_NAME, DIR_NAME, MyEmitter } from './helpers/constants.js';
import { routeHandler } from './helpers/routeHandler.js';
import { csvEventEmitter } from './service/eventEmiiter.js';
import runFileWatcher from './service/fileWatcher.js';
import startSocket from './service/socketService.js';

//*services related
const myEmitter = new MyEmitter();
const sockserver = new WebSocketServer({ port: 3002 });
//* env vars
dotenv.config();
const PORT = process.env.PROCESS ?? '3001';
// const CERT = process.env.CERT ?? 'certs/certificates.pem';
// const KEY = process.env.KEY ?? 'certs/private-key.pem';
//* loading SSL certs
const options = {
    key: fs.readFileSync(process.env.KEY ?? 'certs/private-key.pem'),
    cert: fs.readFileSync(process.env.CERT ?? 'certs/certificates.pem')
};
//* server creation
const server = http.createServer(options, routeHandler);
server.on('connect', (req, clientSocket, head) => {
    console.log({ req, clientSocket, head })
})
//* running server
server.listen(PORT, () => {
    console.log(`Secure Server running at https://localhost:${PORT}/`);
    const fileToWatch = path.join(DIR_NAME.substring(0, DIR_NAME.length - 14), CSV_NAME)
    startSocket(sockserver, myEmitter);
    runFileWatcher(fileToWatch, myEmitter);
    csvEventEmitter(myEmitter);
});

