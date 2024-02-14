// 14. Problem: Express Caching Middleware

// Problem Statement: Implement a caching middleware for an Express application. The middleware should cache responses based on the request URL and return cached responses for subsequent identical requests. Allow cache expiration after a specified time.

const express = require("express");
const path = require("path");

const port = 5050;

const cache = new Map();

const cacheMiddleware = async (req, res, next) => {
	const key = req.originalUrl;

	console.log(key);
	if (cache.has(key)) {
		const prevRes = cache.get(key);
		const cachedResponse = JSON.parse(prevRes);
		cachedResponse.cachedMem = "This is a cached response";
		return res.send(cachedResponse);
	}

	res.sendResponse = res.send;
	res.send = (body) => {
		cache.set(key, body);
		res.sendResponse(body);
	};

	next();
};

const cacheExpirationTime = 10 * 1000; // 10 sec

setInterval(() => {
	cache.clear();
	console.log("\nsetInterval: cache cleared\n");
}, cacheExpirationTime);

const currentDir = __dirname;
const filePath = path.join(currentDir, "./../public/index.html");

const serveRoot = async (req, res) => {
	try {
		res.status(200).sendFile(filePath);
	} catch (err) {
		console.log("Error Serving root file");
	}
};

const serveApi = async (req, res) => {
	try {
		const data = { message: "Api data" };
		res.send(data);
	} catch (err) {
		console.log("Error serving api", err);
	}
};

const app = express();
app.get("/", serveRoot);
app.get("/api/data", cacheMiddleware, serveApi);

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
