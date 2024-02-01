console.log('Hello World - Node JS');

function greet() {
    console.log("Hello World");
}

const greetUser = (name) => {
    console.log(`Hello ${name}`);
}

greet();
greetUser("Scaler");

console.log(global);