// Problem Statement: Implement an Express middleware function that logs the timestamp and the HTTP method of every incoming request to the server.

// Function Signature:

/**
 * Express middleware to log incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const requestLoggerMiddleware = (req, res, next) => {
  // Your implementation here

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
	res.status(200).send('Scaler');
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
