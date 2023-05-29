const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
app.use(express.json());


app.use(cors());
const PORT = 3001
const socketIO = require('socket.io')(http,
  {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'], 
  },
}
);

let onlineUsers = []
socketIO.on('connection', (socket) => {
  const { query } = socket.handshake
  console.log(`server message: user ${query.userName} just connected!`);
  const checkUser = onlineUsers.filter((user) => user.name === query.userName);

  if (checkUser.length > 0) {
    console.log('usuário já está online em outra aba');
  } else {
    onlineUsers.push({name: query.userName, token: query.token, socketID: socket.id})
  } 
  socketIO.emit('onlineUsers', onlineUsers);

  socket.on('disconnect', () => {
    console.log(`server message: ${socket.id} user  disconnected`);
    onlineUsers = onlineUsers.filter((user) => user.name !== query.userName);
    console.log(onlineUsers);
    socketIO.emit('onlineUsers',onlineUsers);
  });
  socket.on('message', ({room, content, to, from}) => {
    console.log('from =>', from);
    const senderData = onlineUsers.filter((user) => user.name === from.username)
    console.log(`"${content}" para ${to.name} na sala ${room}`);
    console.log(room);
    console.log(to.socketID);
      socket.emit('dataMessage', {
        content,
        room: room,
        from: senderData[0].name,
        to: to.name 
      });
      socket.to(to.socketID).emit('receivedMessage', {
        content,
        room: room,
        from: senderData[0].name,
        to: to.name 
      })
  })
  socket.on('joinPrivateRoom', (roomID) => {
    console.log(`entrou na sala ${roomID}`);
    socket.join(roomID);
  });
});

app.use(userRoutes);
http.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});