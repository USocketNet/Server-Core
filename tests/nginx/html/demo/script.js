
//#region MASTER SERVER CONNECTION

$(function () {
    console.log('Connecting... ' + 'http://localhost:19090?wpid='+localStorage['wpid']+'&snid='+localStorage['snid']);

    if( localStorage['wpid'] != 'undefined' && localStorage['snid'] != 'undefined' ) { 
        var master = io(
            'http://localhost:19090?wpid=3&snid=Z61rArdz6ByVcqfGO815Z0p6jI4fXx1LEeCHjTIT55O', 
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
            });
        });
    
        master.on('hello', (data) => {
            console.log('Master Client: ' + data); // true
        });
    
        master.on('error', (data) => {
            console.log('Master Client: ' + data); // true
        });
    } 

    $('form').submit(function(e){
        if( $('#m').val() == 'logout' ) {
            e.preventDefault(); // prevents page reloading
            
            localStorage['wpid'] = 'undefined';
            localStorage['snid'] = 'undefined';
            window.location.replace("http://localhost/demo");

            $('#m').val('');
        } return false;
    });
});

//#endregion

// //#region CHAT SERVER CONNECTION

// var chat = io(
//     'http://localhost:19090?wpid=3&snid=0cHfBETzwwDmTZfXrk4cogt6VErw4SmpwAOaPktCh7t', 
//     { 
//         autoConnect: false,
//         forceNew: false,
//         transports: ['websocket', 'polling']
//     }
// ); chat.connect();


// $('form').submit(function(e){
//     if( $('#m').val() ) {
//         e.preventDefault(); // prevents page reloading
//         var msg = $('#m').val();
//         chat.emit('chat', $('#m').val(), (returnee) => {
//             $('#messages').append($('<li style="text-align: right;">').text( 'Me: ' + msg ));
//         });
//         $('#m').val('');
//     } return false;
// });
// chat.on('chat', function(receiving){
//     $('#messages').append($('<li>').text('['+receiving.id+']: ' + receiving.msg));
// });


// chat.on('connect', () => {
//     $('#messages').append($('<li style="text-align: center;">').text( 'Conneted: '+chat.connected+'! My ID is' + chat.id ));

//     var data = { message: 'Hello from Client Connection!' };
//     chat.emit( 'connected', data, (returnee) => {
//         console.log('Connected to chat server on port ' + returnee);
//          chat.emit('hello', 'New Connection! Hello from ' + chat.id);
//     });
// });

// chat.on('hello', (data) => {
//     console.log('Chat Client: : ' + data); // true
// });

// //#endregion

// //#region GAME SERVER CONNECTION

// var game = io(
//     'http://localhost:19090?wpid=3&snid=0cHfBETzwwDmTZfXrk4cogt6VErw4SmpwAOaPktCh7t', 
//     { 
//         autoConnect: false,
//         forceNew: false,
//         transports: ['websocket', 'polling']
//     }
// ); game.connect();


// game.on('connect', () => {
//     console.log('Connected: ' + game.connected + '. Im ' + game.id + ' from game server.');

//     var data = { message: 'Hello from Client Connection!' };
//     game.emit( 'connected', data, (returnee) => {
//         console.log('Connected to game server on port ' + returnee);
//          game.emit('hello', 'New Connection! Hello from ' + game.id);
//     });
// });

// game.on('hello', (data) => {
//     console.log('Game Client: : ' + data); // true
// });

// //#endregion