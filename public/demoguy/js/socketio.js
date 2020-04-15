
//#region SERVER CONNECTION

$(function () {

    function forceDisconnect(log) {
        localStorage.clear();
        console.error('Client Error: ');
        window.location.replace("http://"+window.location.host+"/demoguy");
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
            curUser.wpid = localStorage['wpid'];
        $('#messages').prepend($('<li style="text-align: center;">').text( 'Welcome! '+ curUser.dname+' [' + curUser.email + '] ID: ' + localStorage['wpid'] ));

        let usnList = [];
            usnList.push(new USocketNet('master', curUser)); 
            usnList.push(new USocketNet('chat', curUser)); 
            usnList.push(new USocketNet('game', curUser)); 

        setInterval(() => {
            usnList[1].sendMessage(randomizer(20) + ' ON ' + new Date().toLocaleString());
        }, 2000);
       
        function randomizer(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
         }   
    } 
});

class USocketNet {

    constructor(nsp, curUser) {

        this.conn = io(
            'http://'+window.location.host+':'+this.getServerType(nsp)+'?wpid='+localStorage['wpid']+'&snid='+localStorage['snid']+'&apid='+localStorage['apid'], 
            { 
                reconnection: false,
                forceNew: false,
                transports: ['websocket', 'polling']
            }
        ); this.conn.connect();

        //Client listen for connect. 
        this.conn.on('connect', () => {  
            //this.conn.emit('ping');
            //Send to master for further server verification.
            this.conn.emit( 'connects', localStorage['user'], (returnee) => {
                // chat.emit( 'connected', { data: 'Abc123' }, (user) => {
                //     $('#messages').append($('<li style="text-align: center;">').text( 'Welcome! ' + curUser.dname + '[' +curUser.email+ ']' ));
                // });
                $('#messages').append($('<li style="text-align: center;">').text( nsp+': '+this.conn.connected+'! ID# ' + this.conn.id ));
                
                console.log(nsp+' Connected: ' + this.conn.connected + '. Im ' + this.conn.id + ' from server on port: ' + returnee);
            });
        });

        if(nsp === 'chat') {
            this.conn.on('pub', function( rcvr ) {

                if( curUser.wpid == rcvr.snd ) {
                    $('#messages').append($('<li style="text-align: right;">').text( 'Me: ' + rcvr.msg ));
                } else {
                    $('#messages').append($('<li>').text( rcvr.nme + ' #' + rcvr.snd + ' ['+rcvr.date+']: ' + rcvr.msg));
                }
            });
        }

        this.conn.on('disconnect', (reason) => {
            if (reason === 'io server disconnect') {
              // the disconnection was initiated by the server, you need to reconnect manually
              //socket.connect();
            }
            // else the socket will automatically try to reconnect
            console.log('Event: disconnect - reason: ' + reason);
        });

        this.conn.on('reconnect', (attemptNumber) => {
            console.log('Event: reconnect - attempt: ' + attemptNumber);
        });

        this.conn.on('reconnect_attempt', (attemptNumber) => {
            console.log('Event: reconnect_attempt - attempt: ' + attemptNumber);
        });

        this.conn.on('reconnecting', (attemptNumber) => {
            console.log('Event: reconnecting - attempt: ' + attemptNumber);
        });

        this.conn.on('reconnect_failed', () => {
            console.log('Event: reconnect_failed - ');
        });

        this.conn.on('reconnect_error', (error) => {
            console.log('Event: reconnect_error - ' + error);
        });

        this.conn.on('error', (error) => {
            console.log('Event: connect_timeout - ' + error);
        });

        this.conn.on('connect_timeout', (timeout) => {
            console.log('Event: connect_timeout - ' + timeout);
        });

        this.conn.on('connect_error', (error) => {
            console.log('Event: connect_error - ' + error);
        });

        if(nsp === 'master') {
            this.conn.on('ping', function( ) {
                // console.log('PINGING...');
            });

            this.latency = '0';
            this.conn.on('pong', function( ping ) {
                this.latency = ping + '';
                document.getElementById('latency').innerText = 'PING: ' + ping + 'ms';
            });
        }
        

        return this;
    }

    getServerType(stype) {
        switch(stype) {
            case 'master':
                return '19090';
                break;
            case 'chat':
                return '6060';
                break;
            case 'game':
                return '9090';
                break;
            default:
                return 'undefined';
                
        }
    }

    sendMessage(msg) {
        this.conn.emit('pub', { msg: msg }, (returnee) => {
            $('#messages').append($('<li style="text-align: right;">').text( 'Me: ' + msg ));
        });
    }
}

//#endregion