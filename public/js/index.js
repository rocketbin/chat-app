  var socket = io();
  socket.on('connect', function () {
    socket.on('newMessage', function (message) {
      console.log(`new message ${message.text} from ${message.from}`);
    })
    socket.emit('createMessage', {
      'from': 'test',
      'text': 'test'
    })
  });

  socket.on('disconnect', function () {
    console.log('a user is disconnected from the server!');
  });


