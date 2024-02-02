const readline = require('readline');

const readInput = async (promtMsg) => {
    return new Promise((resolve, reject) => {
        try {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question(promtMsg, (answer) => {
                rl.close();
                resolve(answer);
            });
        } catch (err) {
            console.log('Error Taking User Input', err);
            reject(err);
        }
    });
};

module.exports = readInput

// readInput('Hello').then(
//     answer => { console.log(answer); }
// ).catch(
//     err => { console.log(err); }
// );