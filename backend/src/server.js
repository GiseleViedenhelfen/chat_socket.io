const express = require('express');
const userRoutes = require('./routes/userRoutes');

const http = require('http');
const socketIO = require('socket.io');

const app = express();
app.use(express.json());

const server = http.createServer(app);
// const io = socketIO('socket.io')(http, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'], 
//   },
// });
// app.get('/', (req, res) => {
//   res.send('/index.html');
// });
app.use(userRoutes);
server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 com mongo');
});