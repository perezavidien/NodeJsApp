
'use strict';

const { argv, strict } = require('yargs');

const nameParam = argv.name;
const pathParam = argv.path;

if (typeof (nameParam) !== 'string' || typeof (pathParam) !== 'string')
    console.log('ERROR: Invalid parameters entered.');
else {
    //do stuff here
    console.log(nameParam);
    console.log(pathParam);
}