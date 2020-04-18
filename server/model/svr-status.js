
module.exports = (machine, socket) => {
    socket.on('svr-status', (updateOnly, cback) => {
        if(updateOnly) {
            if(machine.length > 0) {
                cback(machine[machine.length-1]);
            } else {
                cback([])
            }
        } else {
            cback(machine);
        }
    });
}
