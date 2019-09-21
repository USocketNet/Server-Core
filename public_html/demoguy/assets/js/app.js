var socket = io('http://localhost:8080');

socket.on('welcome', function (data) {
    console.log('Token: ' + data.token);
    socket.emit('session', { contype: 'input', chanid : $_GET['cid'] });
});