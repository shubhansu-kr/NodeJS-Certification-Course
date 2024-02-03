// Child Process is a node module used to create sub process within a script

const cp = require('child_process');

console.log(cp);

// Output: 
// {
//     _forkChild: [Function: _forkChild],
//     ChildProcess: [Function: ChildProcess],
//     exec: [Function: exec],
//     execFile: [Function: execFile],
//     execFileSync: [Function: execFileSync],
//     execSync: [Function: execSync],
//     fork: [Function: fork],
//     spawn: [Function: spawn],
//     spawnSync: [Function: spawnSync]
// }

// The child_process.execSync() method is generally identical to exec with the exception that the method will not return until the child process has fully closed. When a timeout has been encountered and killSignal is sent, the method won't return until the process has completely exited.If the child process intercepts and handles the SIGTERMsignal and doesn't exit, the parent process will wait until the child process has exited.
// If the process times out or has a non-zero exit code, this method will throw. The Error object will contain the entire result from spawnSync.

cp.execSync('calc');
// calc is a command shortcut to open calculator app in windows
// So when we execute a child process, calculator is opened 

cp.execSync('start chrome https://www.github.com/shubhansu-kr');

// We can pass commands in execSync function, while will be executed from the present working directory. 
cp.execSync('node 00_GlobalObject.js');