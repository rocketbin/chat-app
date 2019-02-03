console.clear();
const path = require('path');
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIo(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  let ip = socket.request.connection.remoteAddress;
  console.log(`${ip} is connected`);
  socket.on('createMessage', (message) => {
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  })


  socket.on('disconnect', (user) => {
    console.log(`${ip} is disconnected`);
  })
})

server.listen(port, () => console.log(`Server is up on :${port}`));

