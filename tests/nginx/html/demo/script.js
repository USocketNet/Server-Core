
//#region MASTER SERVER CONNECTION

$(function () {

    var master = io(
        'http://localhost:19090?token=demoguy&seckey=HashKey123', 
        { 
            autoConnect: false,
            forceNew: false,
            transports: ['websocket', 'polling']
        }
    ); master.connect();


    master.on('connect', () => {
        console.log('Connected: ' + master.connected + '. Im ' + master.id + ' from master server.');

        var data = { message: 'Hello from Client!' };
        master.emit( 'connected', data, (returnee) => {
            console.log('Connected to master server on port ' + returnee);
            master.emit('hello', 'New Connection! Hello from ' + master.id);
        });
    });

    master.on('hello', (data) => {
        console.log('Master Client: ' + data); // true
    });

});

//#endregion

//#region CHAT SERVER CONNECTION

var chat = io(
    'http://localhost:6060?token=demoguy&seckey=HashKey123', 
    { 
        autoConnect: false,
        forceNew: false,
        transports: ['websocket', 'polling']
    }
); chat.connect();


$('form').submit(function(e){
    if( $('#m').val() ) {
        e.preventDefault(); // prevents page reloading
        var msg = $('#m').val();
        chat.emit('chat', $('#m').val(), (returnee) => {
            $('#messages').append($('<li style="text-align: right;">').text( 'Me: ' + msg ));
        });
        $('#m').val('');
    } return false;
});
chat.on('chat', function(receiving){
    $('#messages').append($('<li>').text('['+receiving.id+']: ' + receiving.msg));
});


chat.on('connect', () => {
    $('#messages').append($('<li style="text-align: center;">').text( 'Conneted: '+chat.connected+'! My ID is' + chat.id ));

    var data = { message: 'Hello from Client Connection!' };
    chat.emit( 'connected', data, (returnee) => {
        console.log('Connected to chat server on port ' + returnee);
         chat.emit('hello', 'New Connection! Hello from ' + chat.id);
    });
});

chat.on('hello', (data) => {
    console.log('Chat Client: : ' + data); // true
});

//#endregion

//#region GAME SERVER CONNECTION

var game = io(
    'http://localhost:9090?token=demoguy&seckey=HashKey123', 
    { 
        autoConnect: false,
        forceNew: false,
        transports: ['websocket', 'polling']
    }
); game.connect();


game.on('connect', () => {
    console.log('Connected: ' + game.connected + '. Im ' + game.id + ' from game server.');

    var data = { message: 'Hello from Client Connection!' };
    game.emit( 'connected', data, (returnee) => {
        console.log('Connected to game server on port ' + returnee);
         game.emit('hello', 'New Connection! Hello from ' + game.id);
    });
});

game.on('hello', (data) => {
    console.log('Game Client: : ' + data); // true
});

//#endregion