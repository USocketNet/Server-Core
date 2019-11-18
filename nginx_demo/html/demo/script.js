var socket = io(
    'http://localhost:8080?token=demoguy', 
    { 
        autoConnect: false,
        forceNew: false,
        transports: ['polling', 'websocket']
    }
); socket.connect();

var user = {
    name: 'demoguy'
};

socket.on('connect', () => {
    console.log('Connected: ' + socket.connected + '. Im ' + socket.id);

    var data = { message: 'Hello from Client Connection!' };
    socket.emit( 'connected', data, (returnee) => {
         console.log('Connection callback from server: ' + returnee);
         socket.emit('hello', 'New Connection! Hello from ' + socket.id);
    });
});

socket.on('hello', (data) => {
    console.log('Message: ' + data); // true
});