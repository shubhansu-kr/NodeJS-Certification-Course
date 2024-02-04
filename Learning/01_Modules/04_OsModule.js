// Os module is particulary used to get the information about the current system

const os = require('os');

// arch() method gives an information about architechture
console.log(os.arch()); 
// Output: x64


console.log(os.platform()); 
console.log(os.networkInterfaces()); 
console.log(os.cpus());

// OS modules are used to figure out if the system is compatible for the 
// software or not.

console.log(os.freemem(), os.totalmem());