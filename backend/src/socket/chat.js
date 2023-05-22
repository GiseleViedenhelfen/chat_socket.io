
module.exports = (io) => io.on('connection', (socket) => {
  socket.on('connect', () => {
    //considerar pessoa conectada
    console.log(`server message: ${socket.id} user just connected!`);
  });
  socket.on('clientMessage', (message) => {
    // mensagens usuário
    console.log(socket.id);
    io.emit('serverMessage', message);
  });
  socket.on('disconnect', () => {
    // desabilitar chat com a pessoa pois está desconectada
    socket.broadcast.emit('serverMessage', `${socket.id} acabou de se desconectar! :(`);
  });
}) 

