
const process = require('process');
const debug = require('./debug')();

// Server process debugging. Show a warning about the uncaught exceptions.
process.on('uncaughtException', function (uerror) {
    debug.log( 'UncaughtException', + uerror.stack + ' @ ' + uerror, 'red', 'process' );
});
process.stdin.resume(); //Instead of exiting or close server, resume.
process.on("beforeExit", () => 
    debug.log('BeforeExit', 'Received warning that the node server application is trying to shutdown!', 'red', 'process')
);
process.on("exit", () => 
    debug.log('Exitting', 'Node server application was shutdown for some reason!', 'red', 'process')
);
