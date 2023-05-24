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
  socket.on('privateChat', ({content, to,  from}) => {
    const senderData = onlineUsers.filter((user) => user.name === from.username)
    const receiver = to.socketID;

      socket.to(receiver).emit("receivedMessage", {
        content,
        from: senderData[0].name,
        to: to.name
      });
      socket.to(senderData.socketID).emit("sendedMessage", {
        content,
        from: senderData[0].name,
        to: to.name
      })
  })
});

app.use(userRoutes);
http.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});