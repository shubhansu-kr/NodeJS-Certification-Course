// 8. Problem: Express Error Handling

// Problem Statement: Create an Express route that throws an error if the request parameter "number" is not a positive integer. Implement an error handling middleware to catch and handle this specific error, returning a custom error message and a 400 Bad Request status.

const requestLoggerMiddleware = async (req, res, next) => {
	const timestamp = new Date().toISOString();
	const { method, url, ip } = req;
	console.log(` ${timestamp} ${method} ${url} ${ip}`);
	next();
};

const signIntegerMiddleware = async (req, res, next) => {
    let number = req.query.number;
    
	try {
        if (number <= 0) {
            throw new Error("Number is not positive");
		} else {
            req.number = number;
			next();
		}
	} catch (err) {
        console.log('negative number');
		res.status(400).send(err);
	}
};

const positiveIntegerHandler = async (req, res) => {
    console.log(req.number);
    res.status(200).send("ok");
};

const greetHandler = async (req, res) => {
	let name = req.query.name;
	let msg = `Hello, ` + (name ? name : "Guest");

	console.log(msg);

	res.status(200).send(msg);
};


const homePage = async (req, res) => {
	res.status(200).send("Scaler");
};


const express = require("express");
const port = 5050;

const app = express();

app.get("/", requestLoggerMiddleware, homePage);
app.get("/greet", requestLoggerMiddleware, greetHandler);
app.get(
	"/positive",
	requestLoggerMiddleware,
	signIntegerMiddleware,
	positiveIntegerHandler
);

const startServer = async () => {
	try {
		app.listen(port, () => {
			console.log(`Server is listening to port ${port}`);
			console.log(`Go live: http://localhost:${port}`);
		});
	} catch (err) {
		console.log("Error starting the server", err);
		process.exit(1);
	}
};

startServer();
