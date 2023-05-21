const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
app.use(express.json());

app.use(cors());

// const io = require('socket.io')(http, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'], 
//   },
// });


// require('../src/socket/chat')(io);

app.use(userRoutes);
http.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});