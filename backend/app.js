// import {Server} from "socket.io";

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { Server } = require("socket.io");

const app = express();


// app.use(cors())
// const server = http.createServer(app);
const httpServer=http.createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:3000",
        credentials:true
    }
});




// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle joining a specific room
    socket.on('join-room', (roomName) => {
        // Join the specified room
        socket.join(roomName);
        console.log(`User ${socket.id} joined room ${roomName}`);
    });

    // Handle leaving a specific room
    socket.on('leave-room', (roomName) => {
        // Leave the specified room
        socket.leave(roomName);
        console.log(`User ${socket.id} left room ${roomName}`);
    });

    // Handle sending invite to a specific room
    socket.on('send-invite', (roomName, data) => {
        // Emit event to specific room
        io.to(roomName).emit('invite-received', data);
    });

    // Handle user joining the meeting in a specific room
    socket.on('join-meeting', (roomName) => {
        // Broadcast event to all users in the room to update meeting participants
        io.to(roomName).emit('user-joined', socket.id);
    });

    // Handle user leaving the meeting in a specific room
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // Broadcast event to all users to update meeting participants
        io.emit('user-left', socket.id);
    });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
