import { io } from 'socket.io-client';

const URL = 'http://localhost:3000';
// const URL = "https://the-end-of-the-course-1.onrender.com"
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
