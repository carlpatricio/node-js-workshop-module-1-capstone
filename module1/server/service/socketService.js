
const startSocket = (socketserver, emitter) => {
    socketserver.on('connection', (ws) => {
        console.log(`New client connected! ${new Date()}`)
        //* send data to FE
        ws.send('connection established')
        //* listen to event emitter after connection established
        emitter.emit("socketEmit", ws)
        //* socket close handler
        ws.on('close', () => console.log(`Socket has disconnected! ${new Date()}`));
        //* socket error handler
        ws.on('error', (err) => console.log(`Socket has error ${err}`));

    });

}

export default startSocket;