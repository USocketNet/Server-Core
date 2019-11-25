
//#region MASTER SERVER CONNECTION

$(function () {

    function forceDisconnect(log) {
        localStorage.clear();
        window.location.replace("http://localhost/demo");
    }

    $('form').submit(function(e) {
        e.preventDefault(); //prevents page reloading.
        if( $('#m').val() == 'logout' ) {
            forceDisconnect();
            $('#m').val('');
        } else if( $('#m').val() ) {
            sendChatMessage( $('#m').val() );
            $('#m').val('');
        } else {
            console.log( 'Input value is not in the list of conditions.' );
        } return false;
    });

    if( localStorage['wpid'] != 'undefined' && localStorage['snid'] != 'undefined' ) { 

        //#region Master Connection.
            //Master Initialized and Connect.
            var master = io(
                'http://localhost:19091?wpid='+localStorage['wpid']+'&snid='+localStorage['snid'], 
                { 
                    autoConnect: false,
                    forceNew: false,
                    transports: ['websocket', 'polling']
                }
            ); master.connect();

            //Client listen for connect. 
            master.on('connect', () => {                
                //Send to master for further server verification.
                master.emit( 'connected', { data: 'Abc123' }, (returnee) => {
                    console.log('Master Connected: ' + master.connected + '. Im ' + master.id + ' from master server on port: ' + returnee);
                });
            });

            //Client listen for disconnect. 
            master.on('disconnect', (data) => {
                forceDisconnect('Master Disconnected: ' + data);
            });

            //Client listen for disconnect. 
            master.on('connect_error', (data) => {
                forceDisconnect('Master Connect Error: ' + data);
            });

            //Client listen for disconnect. 
            master.on('connect_timeout', (data) => {
                forceDisconnect('Master Connect Timeout: ' + data);
            });

            //Client listen for disconnect. 
            master.on('reconnect_error ', (data) => {
                forceDisconnect('Master Reconnect Error : ' + data);
            });

            //Client listen for disconnect. 
            master.on('reconnect_failed', (data) => {
                forceDisconnect('Master Reconnect Failed: ' + data);
            });
    
            //Listens form any server error.
            master.on('error', (data) => {
                forceDisconnect('Master Error: ' + data);
            });
        //#endregion

        //#region Chat Connection.

            var chat = io(
                'http://localhost:6061?wpid='+localStorage['wpid']+'&snid='+localStorage['snid'], 
                { 
                    autoConnect: false,
                    forceNew: false,
                    transports: ['websocket', 'polling']
                }
            ); chat.connect();

            chat.on('chat', function(receiving){
                $('#messages').append($('<li>').text('['+receiving.id+']: ' + receiving.msg));
            });
            
            chat.on('connect', () => {
                $('#messages').append($('<li style="text-align: center;">').text( 'Conneted: '+chat.connected+'! My ID is' + chat.id ));
            
                chat.emit( 'connected', { data: 'Abc123' }, (returnee) => {
                    console.log('Chat Connected: ' + master.connected + '. Im ' + master.id + ' from master server on port: ' + returnee);
                });
            });

            function sendChatMessage(msg) {
                chat.emit('chat', msg, (returnee) => {
                    $('#messages').append($('<li style="text-align: right;">').text( 'Me: ' + msg ));
                });
            }
        //#endregion
    } 


    
});

//#endregion

// //#region CHAT SERVER CONNECTION



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