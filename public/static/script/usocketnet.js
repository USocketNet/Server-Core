
class USocketNet {

    /**
     * Get the default for server types. The server types that can be pass are 'master', 'message', and 'match'.
     * @param  {} stype
     */
    getServerTypePort(stype) {
        switch(stype) {
            case 'master':
                return '19090';
            case 'message':
                return '6060';
            case 'match':
                return '4530';
            case 'game':
                return '9090';
            case 'cluster':
                return '8080';
            case 'delivery':
                return '5050';
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

    getUser () {
        return this.curUser;
    }

    /**
     * Instantiate an instance of USocketNet.
     * @param  {} serverType
     * @param  {} serverHost
     * @param  {} curUser
     */
    constructor(serverType, serverHost, userCreds) {
        this.serverType = serverType;
        this.curUser = userCreds;
        this.callbacks = {};
        const servType = this.getServerTypePort(serverType);

        if(typeof servType !== 'undefined' && typeof serverHost !== 'undefined' && typeof userCreds !== 'undefined') {
            this.conn = io(
                'ws://'+serverHost+':'+this.getServerTypePort(serverType), 
                { 
                    autoConnect: false, //by setting this false, you have to call manager.open whenever you decide it’s appropriate.
                    reconnection: true, //whether to reconnect automatically.
                    reconnectionAttempts: 10, //def: Infinity - number of reconnection attempts before giving up
                    reconnectionDelay: 2000, //how long to initially wait before attempting a new reconnection (1000). Affected by +/- randomizationFactor, for example the default initial delay will be between 500 to 1500ms.
                    timeout: 10000, //connection timeout before a connect_error and connect_timeout events are emitted
                    forceNew: true, // (Boolean) whether to reuse an existing connection
                    transports: ['websocket', 'polling'], //a list of transports to try (in order). Engine always attempts to connect directly with the first one.
                    query: userCreds
                }
            ); 

            this.conn.on('reconnect', (attemptNumber) => {
                this.conn.emit( 'connects', userCreds, (res) => {
                    this.emit('svr-reconnect', { serverType: this.serverType, port: res, socketid: this.conn.id } );
                });
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

            if(this.serverType == 'master') {
                setInterval(() => {
                    let updateOnly = typeof this.serverStatus === 'undefined' ? false : true;
                    this.conn.emit( 'svr-status', updateOnly, (servStat) => {
                        this.onServer(servStat);
                    });
                }, 1000);
            }

            return this;
        } else {
            return 'undefined';
        }
    }

    onServer ( status ) {
        let updateOnly = typeof this.serverStatus === 'undefined' ? false : true;
        if(updateOnly) {
            this.serverStatus.push(status);
            if( this.serverStatus.length > 30 ) {
                this.serverStatus.shift();
            }
        } else{
            this.serverStatus = status;
        }

        this.emit('svr-status', status);
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
            this.conn.emit( 'connects', this.getUser(), (res) => {
                if(typeof this.prevConSid === 'undefined') {
                    this.prevConSid = this.conn.id;
                    this.emit('svr-connect', { serverType: this.serverType, port: res, socketid: this.conn.id } );
                }
            });
        });

        if(this.serverType === 'message') {
            this.conn.on('svr', function( msg ) {

                let cbs = cbList['msg-public'];
                if(cbs) {
                    cbs.forEach(cb => cb( { username: msg.u, sender: msg.s, message: msg.m, datestamp: msg.d } ))
                }
            });

            this.conn.on('pri', function( msg ) {

                let cbs = cbList['msg-private'];
                if(cbs) {
                    cbs.forEach(cb => cb( { username: msg.u, sender: msg.s, message: msg.m, datestamp: msg.d } ))
                }
            });
        }

        this.conn.on('disconnect', (reason) => {
            this.emit('svr-disconnect', { reason: reason, socketid: this.conn.id, serverType: this.serverType } );
        });

        if(this.serverType === 'delivery') {
            this.conn.on('notify', (reason) => {
                this.emit('notify', reason );
            });
        }

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

    matchPending() {

    }

    matchActive() {

    }

    matchAuto() {

    }

    matchCreate( data, cback ) {
        console.log('USN match-create');
        this.conn.emit('match-create', data, (reply) => {
            cback(reply);
        });
    }

    matchJoin() {

    }

    matchLeave() {

    }

    customEmit(event, data, cback) {
        this.conn.emit(event, data, (res) => {
            if(res.status == 0) {
                cback( { status: 'success', data: res } );
            } else {
                cback( { status: 'failed' } );
            }
        });
    }

    sendMessage(msg, cback) {
        this.conn.emit('svr', { m: msg }, (res) => {
            if(res.status == 0) {
                cback( { status: 'success', message: msg, datestamp: res.d } );
            } else {
                cback( { status: 'failed' } );
            }
        });
    }

    privateMessage(msg, wpid, cback) {
        this.conn.emit('pri', { m: msg, r: wpid }, (res) => {
            if(res.status == 0) {
                cback( { status: 'success', message: msg, datestamp: res.d } );
            } else {
                cback( { status: 'failed' } );
            }
        });
    }
}
