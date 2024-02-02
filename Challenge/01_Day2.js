// https://github.com/shivscaler/Nodejs-30-Days-Challenge-Scaler-Topics/blob/main/Question2.md

// Problem 2: File Writer
// Problem Statement: Create a function writeToFile(filePath, content) that takes the path to a file and user input content as input. The function should write the content to the specified file using the fs module.


const readline = require('readline');
const path = require('path');
const fs = require('fs').promises;

const currentDir = __dirname;
const filePath = path.join(currentDir, 'Dummy.txt');

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

const writeToFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, data);
    console.log(`Data has been written to ${filePath}`);
  } catch (err) {
    console.error(`Error writing to ${filePath}`, err);
  }
};

(async () => {
  try {
    const userInput = await getInput('Enter text to write to file: ');
    await writeToFile(filePath , userInput);
  } catch (err) {
    console.error('Error Taking User Input or Writing to File', err);
    process.exit(1);
  }
})();
