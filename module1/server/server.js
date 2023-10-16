import http from 'http';
import path from 'path';
import { WebSocketServer } from 'ws';
import { CERT_FILE, PORT, PRIVATE_KEY_FILE, SOCKET_PORT } from './helpers/config.js';
import { CSV_NAME, DIR_NAME, MyEmitter } from './helpers/constants.js';
import { routeHandler } from './helpers/routeHandler.js';
import { csvEventEmitter } from './service/eventEmiiter.js';
import runFileWatcher from './service/fileWatcher.js';
import startSocket from './service/socketService.js';

//*services related
const myEmitter = new MyEmitter();
const sockserver = new WebSocketServer({ port: SOCKET_PORT });
/* 
    loading SSL certs 
    generate SSL using openssl, convert to base 64 then add it on .env
*/
const options = {
    key: Buffer.from(PRIVATE_KEY_FILE, "base64").toString("ascii"),
    cert: Buffer.from(CERT_FILE, "base64").toString("ascii")
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

