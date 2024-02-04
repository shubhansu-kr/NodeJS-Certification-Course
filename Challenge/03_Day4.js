// Problem 4: Resolve Path
// Problem Statement: Create a function resolvePath(relativePath) that takes a relative path as input and resolves it to an absolute path using the path module. The function should print the resolved path to the console.

const path = require('path');

const resolvePath = (relativePath) => {
    let absolutePath = path.resolve(relativePath);
    return absolutePath;
}

console.log(resolvePath('../project/folder/file.txt'));
// Expected Output: Resolved Path: /Users/username/project/folder/file.txt

console.log(resolvePath('nonexistent-folder/file.txt'));
// Expected Output: Resolved Path: /Users/username/nonexistent-folder/file.txt