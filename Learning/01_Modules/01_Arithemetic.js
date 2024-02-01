const addition = (a, b) => {
    return a + b;
}

const product = (a, b) => {
    return a * b;
}

const division = (a, b) => {
    return a / b;
}

// Syntax to export the object.
module.exports = {
    // key: value
    add: addition,
    multiply: product,
    divide: division
};

// console.log(module.exports);
// {
//     add: [Function: addition],
//     multiply: [Function: product],
//     divide: [Function: division]
// }

console.log('File 01');