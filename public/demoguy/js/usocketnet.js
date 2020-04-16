
class USocketNet {

    /**
     * Get the default for server types. The server types that can be pass are 'master', 'chat', and 'game'.
     * @param  {} stype
     */
    getServerTypePort(stype) {
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

    isConnected() {
        return this.conn.connected;
    }

    getSocketId() {
        return this.conn.id;
    }

    /**
     * Instantiate an instance of USocketNet.
     * @param  {} serverType
     * @param  {} serverHost
     * @param  {} curUser
     */
    constructor(serverType, serverHost, curUser) {

        this.serverType = serverType;
        this.curUser = curUser;
        this.callbacks = {};
        const servType = this.getServerTypePort(serverType);

        if(typeof servType !== 'undefined' && typeof serverHost !== 'undefined' && typeof curUser !== 'undefined') {
            this.conn = io(
                'ws://'+serverHost+':'+this.getServerTypePort(serverType), 
                { 
                    autoConnect: false, //by setting this false, you have to call manager.open whenever you decide it’s appropriate.
                    reconnection: false, //whether to reconnect automatically.
                    forceNew: true, // (Boolean) whether to reuse an existing connection
                    transports: ['websocket', 'polling'], //a list of transports to try (in order). Engine always attempts to connect directly with the first one.
                    query: {
                        wpid: localStorage['wpid'],
                        snid: localStorage['snid'],
                        apid: localStorage['apid']
                    }
                }
            ); 

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
    
            this.conn.on('ping', () => {
                // console.log('PINGING...');
            });

            this.conn.on('pong', ( latency ) => {
                this.emit('svr-ping', { latency: latency, serverType: this.serverType } );
            });

            return this;
        } else {
            return 'undefined';
        }
    }

    /**
     * Connect this USocketNet instance to the server.
     */
    connect() {

        const cbList = this.callbacks;

        //Connect the client to server.
        this.conn.connect();

        //Client listen for connect. 
        this.conn.on('connect', () => {  
            //Send to master for further server verification.
            this.conn.emit( 'connects', localStorage['user'], (res) => {
                this.emit('svr-connect', { serverType: this.serverType, port: res, socketid: this.conn.id } );
            });
        });

        if(this.serverType === 'chat') {
            this.conn.on('pub', function( msg ) {

                let cbs = cbList['msg-public'];
                if(cbs) {
                    cbs.forEach(cb => cb( { username: msg.u, sender: msg.s, message: msg.m, datestamp: msg.d } ))
                }
            });
        }

        this.conn.on('disconnect', (reason) => {
            this.emit('svr-disconnect', { reason: reason, socketid: this.conn.id, serverType: this.serverType } );
        });

        return this;
    }

    on(events, callback){
        if(!this.callbacks[events]) {
            this.callbacks[events] = [];
        }
        this.callbacks[events].push(callback)
    }

    emit(events, data){
        const cbs = this.callbacks[events]
        if(cbs) {
            cbs.forEach(cb => cb(data))
        }
    }

    sendMessage(msg, cback) {
        this.conn.emit('pub', { m: msg }, (res) => {
            if(res.status == 'success') {
                cback( { status: 'success', message: msg, datestamp: res.d } );
            } else {
                cback( { status: 'failed' } );
            }
        });
    }
}
