// File Module 

const fs = require('fs');

console.log(fs);

// Read a file Synchronous
let fileContent = fs.readFileSync('./Challenge/03_Day4.js');
console.log(fileContent);

// Output: <Buffer 2f 2f 20 50 72 6f 62 6c 65 6d 20 34 3a 20 52 65 73 6f 6c 76 65 20 50 61 74 68 0d 0a 2f 2f 20 50 72 6f 62 6c 65 6d 20 53 74 61 74 65 6d 65 6e 74 3a 20 ... 630 more bytes>

// The output of readfileSync is not in string format. 
// Concatination converts the type of fileContent to string.
console.log('' + fileContent);

// Write in File
let res = fs.writeFileSync('./Challenge/Dummy.txt', 'Write this data to file');

// Append in file
res = fs.appendFileSync('./Challenge/Dummy.txt', '\nAppended data to file');

// Deleting a file 
res = fs.unlinkSync('./Challenge/Dummy.txt');

// What happens if we write in a non-existent file.
// The file is created
res = fs.writeFileSync('./Challenge/Dummy.txt', 'Write this data to file');