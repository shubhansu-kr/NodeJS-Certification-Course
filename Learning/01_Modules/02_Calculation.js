// To import a module, require method is used. 
const arithemetic = require('./01_Arithemetic');

console.log(arithemetic);
// {
//     add: [Function: addition],
//     multiply: [Function: product],
//     divide: [Function: division]
// }

// Now when we are executing this 02_Calculator file and importing module from 01_Arithemetic file, both the files are being executed sequentially. 
console.log('File 02');

// Output: Console logs from both the file.
// File 01
// {
//   add: [Function: addition],
//   multiply: [Function: product],
//   divide: [Function: division]
// }
// File 02

console.log(arithemetic.add(21, 7));
console.log(arithemetic.multiply(21, 7));
console.log(arithemetic.divide(21, 7));