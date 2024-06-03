const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: '*' } });

const players = []; // רשימה לאחסון כל השחקנים

io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('joinGame', (userData) => {
        const newPlayer = { id: socket.id, ...userData };
        console.log('new player joined:', newPlayer);
        socket.join(newPlayer.id);
        players.push(newPlayer);
        console.log('players:', players);
        io.emit('updatePlayerList', players);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id);
        const index = players.findIndex(player => player.id === socket.id);
        if (index !== -1) {
            players.splice(index, 1);
            io.emit('updatePlayerList', players);
        }
    });
});

server.listen(3000, () => console.log("Listening on port 3000"));