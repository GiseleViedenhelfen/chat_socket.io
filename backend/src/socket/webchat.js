module.exports = (io) => {

  socket.on('clientMessage', (message) => {
    io.emit('serverMessage', message)
  });
  socket.on('connect', () => {
    socket.broadcast.emit('serverMessage', `${socket.id} acabou de se conectar!`);
  });
}