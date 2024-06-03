import { io } from 'socket.io-client';

const URL = 'http://localhost:3000';
const socket = io(URL, {
  autoConnect: false,
});

// פונקציה להתחברות לסוקט בלחיצה
const connectToSocket = () => {
  socket.connect();
};

// פונקציה לניתוק מהסוקט
const disconnectFromSocket = () => {
  socket.disconnect();
};

export { socket, connectToSocket, disconnectFromSocket };
