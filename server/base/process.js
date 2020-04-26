
const process = require('process');
const usn = require('usn-utils');

// Server process debugging. Show a warning about the uncaught exceptions.
process.on('uncaughtException', function (uerror) {
    usn.debug.log( 'UncaughtException', + uerror.stack + ' @ ' + uerror, 'red', 'process' );
});
process.stdin.resume(); //Instead of exiting or close server, resume.
process.on("beforeExit", () => 
    usn.debug.log('BeforeExit', 'Received warning that the node server application is trying to shutdown!', 'red', 'process')
);
process.on("exit", () => 
    usn.debug.log('Exitting', 'Node server application was shutdown for some reason!', 'red', 'process')
);
