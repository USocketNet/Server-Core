
//#region SERVER CONNECTION

$(function () {

    function forceDisconnect(log) {
        localStorage.clear();
        console.error('Client Error: ');
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

        var curUser = JSON.parse(localStorage['user']);

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
                master.emit( 'connected', localStorage['user'], (returnee) => {
                    chat.emit( 'connected', { data: 'Abc123' }, (user) => {
                        $('#messages').append($('<li style="text-align: center;">').text( 'Welcome! ' + curUser.dname + '[' +curUser.email+ ']' ));
                    });
                    $('#messages').append($('<li style="text-align: center;">').text( 'Master: '+master.connected+'! ID# ' + master.id ));
                    
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

            chat.on('connect', () => {
                $('#messages').append($('<li style="text-align: center;">').text( 'Chat: '+chat.connected+'! ID# ' + chat.id ));
            });

            function sendChatMessage(msg) {
                chat.emit('chat', msg, (returnee) => {
                    $('#messages').append($('<li style="text-align: right;">').text( 'Me: ' + msg ));
                });
            }

            chat.on('chat', function(receiving) {
                if( curUser.wpid == receiving.wpid ) {
                    $('#messages').append($('<li style="text-align: right;">').text( 'Me: ' + receiving.msg ));
                } else {
                    $('#messages').append($('<li>').text( curUser.dname  + '['+receiving.sid+']: ' + receiving.msg));
                }
            });

        //#endregion

        //#region Game Connection.

            var game = io(
                'http://localhost:9091?wpid='+localStorage['wpid']+'&snid='+localStorage['snid'], 
                { 
                    autoConnect: false,
                    forceNew: false,
                    transports: ['websocket', 'polling']
                }
            ); game.connect();

            game.on('connect', () => {
                $('#messages').append($('<li style="text-align: center;">').text( 'Game: '+game.connected+'! ID# ' + game.id ));
            });

            //Client listen for disconnect. 
            game.on('disconnect', (data) => {
                forceDisconnect('Game Disconnected: ' + data);
            });

            //Client listen for disconnect. 
            game.on('connect_error', (data) => {
                forceDisconnect('Game Connect Error: ' + data);
            });

            //Client listen for disconnect. 
            game.on('connect_timeout', (data) => {
                forceDisconnect('Game Connect Timeout: ' + data);
            });

            //Client listen for disconnect. 
            game.on('reconnect_error ', (data) => {
                forceDisconnect('Game Reconnect Error : ' + data);
            });

            //Client listen for disconnect. 
            game.on('reconnect_failed', (data) => {
                forceDisconnect('Game Reconnect Failed: ' + data);
            });
    
            //Listens form any server error.
            game.on('error', (data) => {
                forceDisconnect('Game Error: ' + data);
            });

        //#endregion
    } 

});

//#endregion