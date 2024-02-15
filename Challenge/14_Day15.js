// 15. Problem: Express Logging Middleware

// Problem Statement: Create a logging middleware for an Express application. The middleware should log detailed information about each incoming request, including the timestamp, HTTP method, URL, request headers, and request body.

const requestLoggerMiddleware = async (req, res, next) => {
	const timestamp = new Date().toISOString();
	const { method, url, ip } = req;
	console.log(` ${timestamp} ${method} ${url} ${ip}`);
	next();
};

const express = require("express");
const port = 5050;

const greetHandler = async (req, res) => {
	let name = req.query.name;
	let msg = `Hello, ` + (name ? name : "Guest");

	console.log(msg);

	res.status(200).send(msg);
};

const homePage = async (req, res) => {
	res.status(200).send("Scaler");
};

const app = express();

app.get("/", requestLoggerMiddleware, homePage);
app.get("/greet", requestLoggerMiddleware, greetHandler);

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
