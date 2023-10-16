import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT ?? '3001';
const SOCKET_PORT = process.env.SOCKET_PORT ?? 3002;
const PRIVATE_KEY_FILE = process.env.PRIVATE_KEY ?? 'privateKey'
const CERT_FILE = process.env.CERT_KEY ?? 'cert'

export { CERT_FILE, PORT, PRIVATE_KEY_FILE, SOCKET_PORT };

