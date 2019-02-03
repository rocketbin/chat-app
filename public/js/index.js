  var socket = io();
  socket.on('connect', function () {
    socket.on('newMessage', function (message) {
      var li = $("<li class = 'well'></li>");
      li.text(`${message.text}`);
      $("#messages").append(li);
    })

    socket.on('newMessageLocation', function (message) {
      var li = $("<li class = 'well text-center'></li>");
      var a = $(`<a href='${message.url}' target='_blank'><h3>check my location</h3></a>`);
      li.append(a);
      $("#messages").append(li);
    })
  });

  socket.on('disconnect', function () {
    console.log('a user is disconnected from the server!');
  });



