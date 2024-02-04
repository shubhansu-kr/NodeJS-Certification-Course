// Path Module

const path = require('path');

// Find out the extention of a module.
let ext = path.extname('./f1.txt');
let base = path.basename('./f1.txt');

console.log(__filename);
console.log(__dirname);