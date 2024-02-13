// 13. Problem: Express WebSocket Integration

// Problem Statement: Extend an existing Express application to include WebSocket support. Create a WebSocket server that echoes back any message it receives from a client. Implement an endpoint "/websocket" that serves an HTML page with JavaScript to establish a WebSocket connection.


const express = require("express");
const path = require("path");
const http = require('http');
const WebSocket = require('ws');

const port = 3000;

const currentDir = __dirname;
const filePath = path.join(currentDir, "./../public/index.html");
const webFilePath = path.join(currentDir, "./../public/socket.html");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const serveRoot = async (req, res) => {
	try {
		res.status(200).sendFile(filePath);
	} catch (err) {
		console.log("Error Serving root file");
	}
};

const serveWebSocket = async (req, res) => {
    try {
        res.status(200).sendFile(webFilePath);
    } catch (err ) {
        console.log("Error serving the websocket file", err);
    }
}


app.get("/", serveRoot);
app.get("/websocket", serveWebSocket);

const start = async () => {
	try {
		app.listen(port, () => {
			console.log(`Server is listening to port: ${port}`);
			console.log(`Go Live: http://localhost:${port}`);
		});

        wss.on('connection', (ws) => {
            console.log('Client connected');
        
            ws.on('message', (message) => {
                console.log(`Received message: ${message}`);
                ws.send(message);
            });
        
            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });
	} catch (err) {
		console.log(`Error starting the server`, err);
		process.exit(1);
	}
};

start();
