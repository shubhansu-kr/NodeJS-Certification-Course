// 11. Problem: Express Authentication Middleware

// Problem Statement: Implement an authentication middleware for an Express application. The middleware should check for the presence of a valid JWT (JSON Web Token) in the request headers. If a valid token is present, allow the request to proceed; otherwise, return a 401 Unauthorized status.

const express = require("express");
const jwt = require("jsonwebtoken");

const port = 5050;
const secret = "This is my secret for JWT signature";

const authMiddleware = async (req, res, next) => {
    const token = req.header.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            req.user = decoded;
            next();
        }
    });
}

const serveProtected = async (req, res) => {
    console.log('User Hit Protected Route');
    console.log('User Authorised');

    res.status(200).send('ProtectedRoute');
}

const app = express();

app.get("/protectedRoute", authMiddleware, serveProtected);

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
