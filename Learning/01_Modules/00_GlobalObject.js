// Global Object

// Predefined functions like setTimeout or setInterval are derived from the window object in the browser, but in node js env, we do not have a window object. 

// eg 
// let name = 'Scaler'
// console.log(window.name); // Gives error in node js env

// Node js env has a global object which stores reference to all the predefined functions and variables. 

// eg  
let name = 'Scaler';
console.log(global.name); // undefined

// global.name gives undefined because of the module structure of the Node Js env. All the variables and functions created in the file remains in the file scope only. That's why name variable is accessible in this 00_GlobalObject.js file only, and not in global object.

// It happens to prevent the overwriting of varibale with same name in different file with different value. 
// eg: If we have two js files f1 and f2 and both have a variable named age. One has a val 21 and another has 18. The global object will only be storing only one reference for age variable(ie gobal.age = 21 or 18). To resolve this ambiguity, the local variables are not directly added to the global context.

// To use any function or variable globally, we would need to make the object available in the global context by exporting the object using the module.exports object.

