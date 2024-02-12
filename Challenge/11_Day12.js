// 12. Problem: Express Rate Limiting

// Problem Statement: Implement a rate-limiting middleware for an Express application. The middleware should limit the number of requests from a single IP address to a specified rate, and return a 429 Too Many Requests status if the limit is exceeded.

const express = require("express");
const path = require("path");
const { RateLimiterMemory } = require("rate-limiter-flexible");

const port = 5050;

const currentDir = __dirname;
const filePath = path.join(currentDir, "./../public/index.html");

// 21 request per min
const rateLimiterMem = new RateLimiterMemory({
	points: 21,
	duration: 1,
});

const rateLimitMiddleware = async (req, res, next) => {
	try {
		await rateLimiterMem.consume(req.ip);
		next();
	} catch (err) {
		res.status(409).send("Request Limit Exceeded");
	}
};

const serveRoot = async (req, res) => {
	try {
		res.status(200).sendFile(filePath);
	} catch (err) {
		console.log("Error Serving root file");
	}
};

const app = express();
app.get("/", rateLimitMiddleware, serveRoot);

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
