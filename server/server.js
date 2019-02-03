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
var { generateMessage, generateLocationMessage } = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  let ip = socket.request.connection.remoteAddress;
  fromAdmin(socket);
  socket.on('createLocationMessage', (coords) => {
    io.emit('newMessageLocation', generateLocationMessage('admin', coords.lat, coords.lng));
  })
  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
    if(callback) {
    callback('success');
    }
  })
  socket.on('disconnect', (user) => {
    console.log(`${ip} is disconnected`);
  })
})

server.listen(port, () => console.log(`Server is up on :${port}`));

function fromAdmin (socket) {
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'a new user has joined'));
}

