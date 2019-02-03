  var socket = io();
  socket.on('connect', function () {
    socket.on('newMessage', function (message) {
      var li = $("<li class = 'well'></li>");
      li.text(`${message.text}`);
      $("#messages").append(li);
    })
    socket.emit('createMessage', {
      from: 'frank',
      text: 'hi!'
    }, function (data) {
      console.log(data);
    });
  });

  socket.on('disconnect', function () {
    console.log('a user is disconnected from the server!');
  });



