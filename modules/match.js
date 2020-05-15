
/*
    * Package: USocketNet
    * Description: Self-Host Realtime Multiplayer Server 
    *       for your Game or Chat Application.
    * Package-Website: https://usocketnet.bytescrafter.net
    * 
    * Author: Bytes Crafter
    * Author-Website:: https://www.bytescrafter.net/about-us
    * License: Copyright (C) Bytes Crafter - All rights Reserved. 
*/

const server_type = 'match';
const core = require('usn-core');
const instance = core.socketio.init();
  //Prevent client socket connection if condition is not met.
  core.syntry.match_verify(instance.sio);
  const conn = instance.connect( server_type );

//Include usn-utils->usn_debug class as global.
const utils = require('usn-utils');
const json = utils.json;
const debug = utils.debug;
const config = utils.config;
const matchmaker = require('usn-mma').cond;

instance.sio.on('connection', (socket) => {

    //Called by client that its connected.
    socket.on('connects', (data, cback) => {
      if(typeof cback === 'function') {
        cback( conn.address().port );
      }
    });

    socket.on('match-create', (data, cback) => {

      console.log('EVENT: match-create event ' + 'UserID: ' + socket.wpid + ' Alias: ' + socket.uname + ' PKEY: ' + socket.pkey );

      matchmaker.getMatch(socket.wpid)
        .then( (curMatch) => {

            if( matchmaker.hasMatch(curMatch) ) {
              if( json.isFunction(cback) ) {
                cback({ found: true, minfo: curMatch }); 
              }
              return false;
            } else {
               if( typeof data.autoCreate !== 'undefined' ) {
                return data.autoCreate == true ? true : false;
               } else {
                return false;
               }
            }

        })
        .then( ( autocreate ) => {

          if( autocreate ) {
            matchmaker.createMatch({
              userId: socket.wpid,
              userAlias: socket.uname,
              capacity: 2,
              params: socket.pkey,
            }).then(newMatch => {
              if( json.isFunction(cback) ) {
                cback({ found: false, minfo: newMatch }); 
              }
            })
          }
          
        })

    });

    socket.on('match-auto', (data, cback) => {
      if(typeof cback === 'function') {
        // matchmaker.autojoinEvent({
        //   userId: socket.wpid,
        //   userAlias: socket.uname,
        //   capacity: 2,
        //   params: 'string',
        // }).then(event => {
        //     if(event == null) {
        //         matchmaker.createEvent({
        //           userId: socket.wpid,
        //           userAlias: socket.uname,
        //           capacity: 2,
        //           params: 'string',
        //         }).then(event => {
        //             console.log("auto:" + JSON.stringify(event));
        //             cback(event);
        //         })
        //     }
        // })
      }
    });

    socket.on('match-join', (data, cback) => {
      if(typeof cback === 'function') {
        cback( conn.address().port );
      }
    });

    socket.on('match-pending', (data, cback) => {
      if(typeof cback === 'function') {
        cback( conn.address().port );
      }
    });

    socket.on('match-active', (data, cback) => {
      if(typeof cback === 'function') {
        cback( conn.address().port );
      }
    });

    socket.on('match-leave', (data, cback) => {
      if(typeof cback === 'function') {
        cback( conn.address().port );
      }
    });

    // socket.on('join-queue', (data, cback) => {
    //   matchCheck(data); //Join match make.
    //   if(typeof cback === 'function') {
    //     cback( { status: 1 } );
    //   }
    // });

    // socket.on('match-auto', (mtch) => {

    //   matchmaker.autojoinEvent({
    //       userId: socket.wpid,
    //       userAlias: socket.wpid,
    //       capacity: 10, //GET prj max match
    //       params: 'projectid', //GET project id
    //   }).then(event => {

    //     console.log("auto:" + JSON.stringify(event));
    //     if(event == null) {
    //         matchmaker.createEvent({
    //             userId: socket.id,
    //             userAlias: socket.wpid,
    //             capacity: 10,
    //             params: 'projectid',
    //         }).then(event => {
    //             console.log("auto:" + JSON.stringify(event));
    //         })
    //     }

    //   })
  
    //   console.log('match-auto: ' + mtch);

    // });

  });
  