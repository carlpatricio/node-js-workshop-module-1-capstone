import chokidar from 'chokidar'

const runFileWatcher = (file, emitter) => {
    //* watcher instance to watch certain file
    const watcher = chokidar.watch(file, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true
    })
    //* watch file for changes
    watcher.on('change', (path, stats) => {
        //* fire event to event emitter 
        emitter.emit('csvEvent')
        console.log(`Triggered csvEvent ${new Date()}`)
    })

    //* watch file for errors
    watcher.on('error', (error) => console.log(`Watcher Error: ${error}`))
    //* watch file if file has been removed
    watcher.on('unlink', (path) => console.log(`File was removed: ${path}`))
    //* watch file if file has been added
    watcher.on('add', (path) => console.log(`File was added: ${path}`))
}

export default runFileWatcher