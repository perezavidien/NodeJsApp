
'use strict';

const { argv, strict } = require('yargs');
const notifier = require('node-notifier');

const nameParam = argv.name;
const pathParam = argv.path;

if (typeof (nameParam) !== 'string' || typeof (pathParam) !== 'string')
    console.log('ERROR: Invalid parameters entered.');
else {
    //do stuff here
    console.log('Watching path: ' + pathParam);

    const fileName = pathParam.slice(pathParam.lastIndexOf('\\') + 1, pathParam.length);
    //console.log(fileName);

    //todo monitor the file changes
    //when updated, check if name exists
    //set nameExists if found, nt case sensitive
    let nameExists = true;
    if (nameExists) {
        notifier.notify({
            title: 'File Watcher',
            message: 'Your name was mentioned on file: ' + fileName + '!'
          });
        console.log('Your name was mentioned on file: ' + fileName + '!');
    }
}