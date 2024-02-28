// Problem 28: WebSocket Integration

// Problem Statement: You are developing a real-time collaborative editing tool using Node.js and Express. You need to integrate WebSocket functionality to allow users to see changes made by others in real-time. Design a solution to establish WebSocket connections, handle incoming messages, and broadcast changes to all connected clients efficiently.

const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('New WebSocket connection established');

    ws.on('message', function incoming(message) {
        console.log('Received: %s', message);
        
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

const PORT = 5500;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
