// Problem: Express Static Files

// Problem Statement: Create an Express application that serves static files (e.g., HTML, CSS, images) from a "public" directory. Ensure that accessing the root ("/") returns the "index.html" file from the "public" directory.

const express = require("express");
const path = require("path");

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

const app = express();
app.get("/", serveRoot);

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
