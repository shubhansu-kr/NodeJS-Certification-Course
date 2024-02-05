// Problem 5: File Extension Checker
// Problem Statement: Create a function checkFileExtension(filePath, expectedExtension) that takes a file path and an expected file extension as input. The function should check if the file has the expected extension using the path module and print the result to the console.

const path = require('path');

const checkFileExtension = (filePath, expectedExtention) => {
    const extension = path.extname(filePath);
    if (extension == expectedExtention) {
        console.log(`File has the expected extension: ${extension}`);
    }
    else {
        console.log(`File does not have the expected extension. Expected: ${expectedExtention}, Actual: ${extension}`);
    }
}

checkFileExtension('./Challenge/Dummy.txt', '.txt');
checkFileExtension('./Challenge/Dummy.txt', '.jpg');