  var socket = io();
  var _p = $.deparam(window.location.search);
  var _f = window.atob(_p.node);
  let param = JSON.parse(_f);

  socket.on('connect', function () {

    socket.emit('join', param, function (err) {
      if (err) {
        alert(err);
        window.location.href = '/';
      }
    });

    socket.on('newMessage', function (message) {
      var li;
      if(message.from === 'admin') {
        li = $("<li class = 'well text-center' style = 'color:whitesmoke'></li>");
        li.html(`<i>${message.text}</i>`);
      } else if (message.from !== param.name){
        li = $("<li class = 'well' style='text-align:right'></li>");
        li.html(`<b style ="color:whitesmoke">${message.from}</b><br/>${message.text}`);
      }else {
        li = $("<li class = 'well' ></li>");
        li.html(`<b style ="color:whitesmoke">${message.from}</b><br/>${message.text}`);
      }
      $("#messages").prepend(li);
    })

    socket.on('newMessageLocation', function (message) {
      var li = $("<li class = 'well text-center'></li>");
      var a = $(`<a href='${message.url}' target='_blank' class = "text-white"><h3>check my location</h3></a>`);
      li.append(a);
      $("#messages").prepend(li);
    })
  });

  socket.on('updateNinjasList', function (ninjas) {
    var ul = $(`<ul class = 'list-group'></ul>`);
    ninjas.forEach(function (user) {
      var li = $(`<li class = 'list-group-item '></li>`);
      li.html(`<i class="fas fa-bug"></i> ${user}`);
      $(li).appendTo(ul);
    })
    $("#ninjas").html(ul);
  })

  socket.on('disconnect', function () {
    console.log('a user is disconnected from the server!');
  });



