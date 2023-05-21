
module.exports = (io) => io.on('connection', (socket) => {
  socket.on('connect', () => {
    //considerar pessoa conectada

    socket.broadcast.emit('serverMessage', `${socket.id} acabou de se conectar!`);
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

