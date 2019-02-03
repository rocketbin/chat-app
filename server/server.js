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
var { isRealString } = require('./utils/validation');
const { Fleet } = require('./utils/fleet');
var fleet = new Fleet();
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  // on connect
  socket.on('join', (param, callback) => {
    if (!isRealString(param.name) || !isRealString(param.fleet)) {
      return callback('Name and fleet are required');
    }
    fromAdmin(socket)
    socket.join(param.fleet);
    fleet.removeNinja(socket.id);
    fleet.addNinja(socket.id, param.name, param.fleet);
    io.to(param.fleet).emit('updateNinjasList', fleet.getNinjaList(param.fleet));
    socket.broadcast.to(param.fleet).emit('newMessage', generateMessage('admin', `${param.name} has joined ${param.fleet}`));
  })
  socket.on('createLocationMessage', (coords) => {
    var ninja = fleet.getNinja(socket.id);
    if(ninja) {
      io.to(ninja.fleet).emit('newMessageLocation', generateLocationMessage('admin', coords.lat, coords.lng));
    }
  })
  socket.on('createMessage', (message) => {
    var ninja = fleet.getNinja(socket.id);
    if(ninja && isRealString(message.text)) {
      io.to(ninja.fleet).emit('newMessage', generateMessage(ninja.name, message.text));
    }
  })
  // on connect
  socket.on('disconnect', () => {
    var ninja = fleet.removeNinja(socket.id);
    if(ninja) {
      io.to(ninja.fleet).emit('updateNinjasList', fleet.getNinjaList(ninja.fleet));
      io.to(ninja.fleet).emit('newMessage', generateMessage('admin', `${ninja.name} has left the fleet!`));
    }
  })
})

server.listen(port, () => console.log(`Server is up on :${port}`));

function fromAdmin (socket) {
  socket.emit('newMessage', generateMessage('admin', 'Welcome to the Chat app'));
  socket.broadcast.emit('newMessage', generateMessage('admin', 'a new user has joined'));
}

