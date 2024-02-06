// 6. Problem: Express Route Handling
// Problem Statement: You are building a web application using Express in Node.js. Create an Express route to handle GET requests to the endpoint "/greet" that takes a query parameter "name" and returns a personalized greeting. If the name parameter is not provided, the default greeting should be "Hello, Guest!".

/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

const express = require('express');
const port = 5050;

const greetHandler = async (req, res) => {
    let name = req.query.name;
    let msg = `Hello, ` + (name ? name: 'Guest');

    console.log(msg);

    res.status(200).send(msg);
}


const app = express();

app.get('/greet', (req, res) => {
    greetHandler(req, res);
});

const startServer = async () => {
    try {
        app.listen(port, ()=>{
            console.log(`Server is listening to port ${port}`);
            console.log(`Go live: http://localhost:${port}`);
        });
    } catch (err) {
        console.log('Error starting the server', err);
        process.exit(1);        
    }
}

startServer();