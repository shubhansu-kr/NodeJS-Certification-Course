// https://github.com/shivscaler/Nodejs-30-Days-Challenge-Scaler-Topics/blob/main/Question1.md

// Problem 1: File Reader
// Problem Statement: Create a function readFileContent(filePath) that takes the path to a file as input and reads its content asynchronously using the fs module. The function should print the content to the console.

const fs = require('fs');
const path = require('path');

const currentDir = __dirname;
const fileName = 'Dummy.txt';
const filePath = path.join(currentDir, fileName);

console.log(filePath);

fs.readFile(filePath, 'utf-8', (error, fileContent) => {
    if (error) {
        console.log('Error reading the file content', error);
        process.exit(1);
    } else {
        console.log('File content:', fileContent);
        console.log('Async behavior: This log executed after reading the file');
    }
});


console.log('Async behavior: This log executed first');