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

socketIO.on('connection', (socket) => {
  let users = []
  const { query } = socket.handshake
  console.log(`server message: user ${query.userName} just connected!`);
  users.push({name: query.userName, token: query.token})
  console.log('array users => ', users);

  socket.on('disconnect', () => {
    console.log(`server message: user  disconnected`);
    socket.disconnect();
  });
  // socket.on('login', (socket) => {
  //  console.log(`usuário ${socket.id} fez login`)
  //  console.log(socket);
  // })
});

app.use(userRoutes);
http.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});