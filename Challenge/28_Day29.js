// Problem 29: Error Handling Middleware

// Problem Statement: You are developing a complex web application with multiple routes and middleware in Node.js and Express. You want to implement a centralized error handling mechanism to catch and handle errors gracefully without crashing the server. Design a middleware function that intercepts errors thrown by route handlers or other middleware and sends an appropriate error response to the client.

const express = require("express");
const path = require("path");

const port = 5050;

const currentDir = __dirname;
const filePath = path.join(currentDir, "./../public/index.html");

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;

    res.status(statusCode);

    res.json({
        error: {
            message: err.message || 'Internal Server Error',
            status: statusCode
        }
    });
};

const serveRoot = async (req, res) => {
    try {
        res.status(200).sendFile(filePath);
	} catch (err) {
        console.log("Error Serving root file");
	}
};

const simulateError = (req, res, next) => {
    try {
        throw new Error('Something went wrong: Simulation');
    } catch (error) {
        next(error);
    }
};

const app = express();
app.use(errorHandler);
app.get("/", serveRoot);
app.use('/err', simulateError);

const start = async () => {
	try {
		app.listen(port, () => {
			console.log(`Server is listening to port: ${port}`);
			console.log(`Go Live: http://localhost:${port}`);
		});
	} catch (err) {
		console.log(`Error starting the server`, err);
		process.exit(1);
	}
};

start();
