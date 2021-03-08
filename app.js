'use strict';

const { argv, strict } = require('yargs');
const notifier = require('node-notifier');
const { EventEmitter } = require("events");
const fs = require("fs");

class FileWatcher extends EventEmitter {
    constructor() {
        super();
    }

    watchfolder(name, path) {
        this.readDirectory(name, path);
        let that = this;

        fs.watch(path, { persistent: true }, function (event, fileName) {
            const completePath = path + '\\' + fileName;
            // console.log(event);
            // console.log(completePath);

            fs.readFile(completePath, (err, data) => {
                // if (err) {
                //     console.error(err);
                //     return;
                // }
                if (data && data.toString().toLowerCase().indexOf(name) > -1) {
                    that.emit("nameFoundOnFile", fileName);
                }
            });
        });
    }

    readDirectory(text, path) {
        let that = this;
        fs.readdir(path, function (err, filenames) {
            //console.log(filenames);
            // if (err) {
            //     console.error(err);
            //     return;
            // }
            filenames.forEach(function (filename) {
                fs.readFile(path + '\\' + filename, 'utf-8', function (err, data) {
                    //console.log(filename);
                    // if (err) {
                    //     console.error(err);
                    //     return;
                    // }
                    if (data.toString().toLowerCase().indexOf(text) > -1) {
                        that.emit("nameFoundOnFile", filename);
                    }
                });
            });
        });
    }
}

const nameParam = argv.name;
const pathParam = argv.path;

if (typeof (nameParam) !== 'string' || typeof (pathParam) !== 'string')
    console.log('ERROR: Invalid parameters entered.');
else {
    console.log(`Watching path: ${pathParam}`);

    const fileWatcher = new FileWatcher();

    fileWatcher.on("nameFoundOnFile", fileName => {
        // console.log('inside nameFoundOnFile');
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
        console.log(`Your name was mentioned on file: ${fileName}!`);
    });

    fileWatcher.on("error", () => {
        console.log('One or more errors occured.');
    });

    fileWatcher.watchfolder(nameParam, pathParam);
}