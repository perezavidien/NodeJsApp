

'use strict';

const { argv, strict } = require('yargs');
const notifier = require('node-notifier');
const { EventEmitter } = require("events");

class FileWatcher extends EventEmitter {
    constructor() {
        super();
    }

    watchfolder(name, path) {
        //console.log('name found on file called');
        //should watch the path
        const fileName = path.slice(path.lastIndexOf('\\') + 1, path.length);

        //implement file watcher logichere
        const nameFound = true;

        if (nameFound)
            this.emit("nameFoundOnFile", fileName);
    }
}

const nameParam = argv.name;
const pathParam = argv.path;

if (typeof (nameParam) !== 'string' || typeof (pathParam) !== 'string')
    console.log('ERROR: Invalid parameters entered.');
else {
    console.log(`Watching path: ${pathParam}`);

    //wait for updates here
    const fileWatcher = new FileWatcher(nameParam, pathParam);
    //const fileWatcher = new EventEmitter();
    //const fileName = pathParam.slice(pathParam.lastIndexOf('\\') + 1, pathParam.length);

    fileWatcher.on("nameFoundOnFile", fileName => {
        //console.log('inside nameFoundOnFile');
        fileWatcher.emit("openToastNotification", fileName);
        fileWatcher.emit("printToConsole", fileName);
    });

    fileWatcher.on("openToastNotification", fileName => {
        //console.log('inside openToastNotification');
        notifier.notify({
            title: 'File Watcher',
            message: `Your name was mentioned on file: ${fileName}!`
        });
    });

    fileWatcher.on("printToConsole", fileName => {
        //console.log('inside printToConsole');
        console.log(`Your name was mentioned on file: ${fileName}!`);
    });

    fileWatcher.on("error", () => {
        console.log('One or more errors occured.');
    });

    fileWatcher.watchfolder(nameParam, pathParam);
}