
//#region MASTER SERVER CONNECTION

var master = io(
    'http://localhost:19090?token=demoguy', 
    { 
        autoConnect: false,
        forceNew: false,
        transports: ['polling', 'websocket']
    }
); master.connect();

var user = {
    name: 'demoguy'
};

master.on('connect', () => {
    console.log('Connected: ' + master.connected + '. Im ' + master.id);

    var data = { message: 'Hello from Client Connection!' };
    master.emit( 'connected', data, (returnee) => {
         console.log('Connection callback from server: ' + returnee);
         master.emit('hello', 'New Connection! Hello from ' + master.id);
    });
});

master.on('hello', (data) => {
    console.log('Message: ' + data); // true
});

//#endregion

// //#region CHAT SERVER CONNECTION

// var chat = io(
//     'http://localhost:6060?token=demoguy', 
//     { 
//         autoConnect: false,
//         forceNew: false,
//         transports: ['polling', 'websocket']
//     }
// ); chat.connect();

// var user = {
//     name: 'demoguy'
// };

// chat.on('connect', () => {
//     console.log('Connected: ' + chat.connected + '. Im ' + chat.id);

//     var data = { message: 'Hello from Client Connection!' };
//     chat.emit( 'connected', data, (returnee) => {
//          console.log('Connection callback from server: ' + returnee);
//          chat.emit('hello', 'New Connection! Hello from ' + chat.id);
//     });
// });

// chat.on('hello', (data) => {
//     console.log('Message: ' + data); // true
// });

// //#endregion

// //#region GAME SERVER CONNECTION

var game = io(
    'http://localhost:9090?token=demoguy', 
    { 
        autoConnect: false,
        forceNew: false,
        transports: ['polling', 'websocket']
    }
); game.connect();

var user = {
    name: 'demoguy'
};

game.on('connect', () => {
    console.log('Connected: ' + game.connected + '. Im ' + game.id);

    var data = { message: 'Hello from Client Connection!' };
    game.emit( 'connected', data, (returnee) => {
         console.log('Connection callback from server: ' + returnee);
         game.emit('hello', 'New Connection! Hello from ' + game.id);
    });
});

game.on('hello', (data) => {
    console.log('Message: ' + data); // true
});

//#endregion