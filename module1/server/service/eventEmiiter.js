import { CSV_NAME, DIR_NAME } from "../helpers/constants.js";
import csvToJSON from "../helpers/csvToJson.js";
import { readFile } from "../helpers/readFile.js";

const csvEventEmitter = (emitter) => {
    let socket;
    //* event emitter when socket server start & pass the socket
    emitter.addListener('socketEmit', async (s) => {
        socket = s;
    });
    //* event emitter for csv event
    emitter.addListener('csvEvent', async () => {
        const newDir = DIR_NAME.substring(0, DIR_NAME.length - 14);
        const file = await readFile(newDir, CSV_NAME);
        //* convert csv buffer str to json
        const fileJSON = csvToJSON(file.toString());

        //* emit socket to ws if socket has value
        if (socket) {
            socket.send(JSON.stringify({ type: 'csv', data: fileJSON }));
            console.log(`Event Fired: Data sent via socket at ${new Date()}`)
        }
    });
}


export { csvEventEmitter };

