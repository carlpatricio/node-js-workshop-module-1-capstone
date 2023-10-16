import { CSV_NAME, DIR_NAME } from "./constants.js";
import { readFile } from "./readFile.js";


const routeHandler = async (req, res) => {

    const routeURL = req.url;
    switch (routeURL) {
        case '/metrics':
            res.writeHead(200, { 'Content-Type': 'text/csv' });
            const newDir = DIR_NAME.substring(0, DIR_NAME.length - 14);
            const file = await readFile(newDir, CSV_NAME);
            res.end(file, 'utf-8');
            break;
        default:
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Default Route\n');
            break;
    }
}

export { routeHandler };

