const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*', methods: '*' } });

const rooms = {}; // מילון לאחסון החדרים

const players = []; // רשימה לאחסון כל השחקנים

io.on('connection', (socket) => {
    // ...

    socket.on('joinGame', (userData) => {
        // הוספת השחקן החדש לרשימת השחקנים
        const newPlayer = { id: socket.id, ...userData };
        players.push(newPlayer);

        // שליחת רשימת השחקנים המעודכנת לכל הסוקטים המחוברים
        io.emit('updatePlayerList', players);
    });

    // ...
});

server.listen(3000, () => console.log("Listening on port 3000"));
