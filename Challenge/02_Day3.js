// Problem 3: Execute Command
// Problem Statement: Create a function executeCommand(command) that takes a shell command as input and executes it using the child_process module. The function should print the output of the command to the console.

const readline = require('readline');
const cp = require('child_process');

const getInput = async (promptMsg) => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(promptMsg, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
};


const executeCommand = (command) => {
    try {
        cp.execSync(command, {stdio: 'inherit'});
    } catch (err) {
        console.log('Error Executing command: ', err);
        process.exit(1);
    }
}

(async () => {
    try {
        const userInput = await getInput('Enter Command to Execute: ');
        const consoleOutput = executeCommand(userInput);
        console.log(consoleOutput);
    } catch (err) {
        console.error('Error Taking User Input or Executing Command', err);
        process.exit(1);
    }
})();