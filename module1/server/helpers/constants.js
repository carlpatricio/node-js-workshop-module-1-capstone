import EventEmitter from 'events';
import path from 'path';
import { fileURLToPath } from 'url';

//* static constants
const CSV_NAME = 'metrics.csv';

//* constants using functions
const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = path.dirname(FILE_NAME);

//*classes
class MyEmitter extends EventEmitter { }
export { CSV_NAME, DIR_NAME, FILE_NAME, MyEmitter };

