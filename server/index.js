const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: '*' } });

const roomID = '1111'; // The room ID where all players will join
const players = []; // רשימה לאחסון כל השחקנים

io.on('connection', (socket) => {
    // console.log('a user connected:', socket.id);

    socket.on('joinGame', (userData) => {
        // Check if the player is already in the game
        const existingPlayer = players.find(player => player.id === socket.id);
        if (existingPlayer) {
            // If the player is already in the game, send an error message
            socket.emit('error', { message: 'Player already in the game' });
        } else {
            // If the player is not in the game, add them to the players list
            const newPlayer = { id: socket.id, ...userData };
            // console.log('new player joined:', newPlayer);
            socket.join(roomID); // Join the room "1111"
            players.push(newPlayer);
            // console.log('players:', players);
            io.to(roomID).emit('joinGame', players); // Emit to the room "1111"
        }
    });

    socket.on('updatePlayerList', (playerList) => {
        // console.log('updatePlayerList', playerList);
        io.to(roomID).emit('updatePlayerList', playerList);
    });

    socket.on('addWinner', (winners) => {
        console.log({ winners });
        io.to(roomID).emit('addWinner', winners);
    });

    socket.on('disconnect', () => {
        // console.log('user disconnected:', socket.id);
        const index = players.findIndex(player => player.id === socket.id);
        if (index !== -1) {
            players.splice(index, 1);
            io.to(roomID).emit('updatePlayerList', players);
        }
    });
});

server.listen(3000, () => console.log("Listening on port 3000"));
