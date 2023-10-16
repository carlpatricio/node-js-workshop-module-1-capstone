import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

const readFile = async (__dirname, fileName) => {
    try {
        // form filepath
        const filePath = path.join(__dirname, fileName);
        // use wrapped function - readfile using promisify
        const file = await readFileAsync(filePath);

        return file;
    }
    catch (err) {
        console.log({ err })
        return null;
    }
}

export { readFile };

