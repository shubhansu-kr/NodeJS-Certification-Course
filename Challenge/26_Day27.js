// Problem: Express Static Files

// Problem Statement: Create an Express application that serves static files (e.g., HTML, CSS, images) from a "public" directory. Ensure that accessing the root ("/") returns the "index.html" file from the "public" directory.

const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const port = 5050;

const currentDir = __dirname;
const filePath = path.join(currentDir, "./../public/index.html");

const serveRoot = async (req, res) => {
	try {
		res.status(200).sendFile(filePath);
	} catch (err) {
		console.log("Error Serving root file");
	}
};

const authenticateMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer")) {
		return res
			.status(StatusCodes.MISDIRECTED_REQUEST)
			.send("Enter a valid authorization token");
	}
	const token = authHeader.split(" ")[1];
	try {
		const payload = jwt.verify(token, process.env.SECRET_KEY);
		req.user = { role: payload.role, id: payload.id };
		next();
	} catch (err) {
		console.log("Error verifying the access token", err);
		return res
			.status(StatusCodes.MISDIRECTED_REQUEST)
			.send("You are not authorized to access this route");
	}
};

const app = express();
app.get("/", authenticateMiddleware, serveRoot);

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
