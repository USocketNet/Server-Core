//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const core = require('../core');

const io = require('socket.io')(core.web.server);
//const redis = require('socket.io-redis');
    //io.adapter(redis({ host: 'localhost', port: 6379 }));
    //io.adapter(redis({ host: 'localhost', port: 6379, "auth_pass": "292469101291+" }));
    
    io.on('connection', function(socket)
    {
		//core.debug.log('OnConnection', ' Connected to client to cpu worker: ' + core.cluster.worker.id + '.', 'white', 'Connect'); //Debugging!

        //#region CREATE SOCKET INSTANCE.
            var curUser = {};
                curUser.si = socket.id;
                curUser.id = socket.id[1] + socket.id[3] + socket.id[7] + socket.id[9];
                curUser.un = ''; //during connection.
                curUser.ci = 'Null';
                curUser.ia = socket.handshake.address;
                curUser.ld = new Date().toLocaleString();
        //#endregion

        /*
        //#region FILTER REMOTE DOMAIN. - Ongoing!
            console.log('Refered: ' + JSON.stringify(socket.handshake.headers.host));
            find.host(socket.handshake.headers.host, function(result)
            {
                if(!result)
                {
                    var resultee = {};
                        resultee.rs = 2;
                    
                    socket.emit('rejected', resultee);
                    alert.download(resultee);

                    data.stats.authError += 1;
                    alert.log('Connect-Forbid', 'IP: ' + curUser.ia + ' rejected on unauthorized domain: ' + socket.handshake.headers.host + '.', 'red', 'Connection');
                }
            });
        //#endregion
        */

        /*
        //#region for Website
			var addedUser = false;

			// when the user disconnects.. perform this
			// when the client emits 'add user', this listens and executes
			socket.on('connects', function(userInfo, callback)
			{
				
				if (addedUser) return;
				callback(curUser);
				// we store the username in the socket session for this client
				socket.username = userInfo.un;
				++numUsers;
				addedUser = true;
				socket.emit('login', {
				numUsers: numUsers
				});
				// echo globally (all clients) that a person has connected
				socket.broadcast.emit('user joined', {
				username: socket.username,
				numUsers: numUsers
				});
			});

			// when the user disconnects.. perform this
			socket.on('disconnect', () => {
				if (addedUser) {
				--numUsers;

				// echo globally that this client has left
				socket.broadcast.emit('user left', {
					username: socket.username,
					numUsers: numUsers
				});
				}
			});

			// when the client emits 'new message', this listens and executes
			socket.on('new message', (data) => {
				// we tell the client to execute 'new message'
				socket.broadcast.emit('new message', {
				username: socket.username,
				message: data
				});
			});

			// when the client emits 'typing', we broadcast it to others
			socket.on('typing', () => {
				socket.broadcast.emit('typing', {
				username: socket.username
				});
			});

			// when the client emits 'stop typing', we broadcast it to others
			socket.on('stop typing', () => {
				socket.broadcast.emit('stop typing', {
				username: socket.username
				});
			});
        //#endregion
        */

        //alert.upload(userinfo); -> core.debug.log('title', 'description', 'white', 'type');

        //#region CONNECTION. - Check!
            socket.on('connect', function(userinfo, callback)
            {
                var resultee = {};
                    resultee.id = curUser.id;
                
                if(typeof userinfo != 'undefined' && typeof callback === 'function')
                {
                    core.debug.upload(userinfo);
                    
                    if(typeof userinfo.ak != 'undefined')
                    {
                        if(userinfo.ak == core.admin.authKey)
                        {
                            core.data.signin(userinfo.un, userinfo.pw, function(returnee)
                            {							
                                if(returnee == 'success') { resultee.ca = 0; }
                                else if(returnee == 'notfound') { resultee.ca = 1; }
                                else if(returnee == 'incorrect') { resultee.ca = 2; }
                                else { resultee.ca = 3; }
                                
                                if(returnee == 'success')
                                {
                                    curUser.un = userinfo.un;
                                    core.users.push( curUser );
                                    
                                    callback( resultee ); //return user profile!
                                    core.debug.download( resultee );
                                
                                    core.data.stats.connection += 1;
                                    core.debug.log('Connect-Success', 'IP: ' + curUser.ia + ' ID: ' + curUser.id + ' UN: ' + curUser.un + ' is connected! | Online: ' + core.users.length, 'white', 'Connection');	
                                }

                                else
                                {
                                    callback( resultee );
                                    core.debug.download(resultee);

                                    core.data.stats.authError += 1;
                                    core.debug.log('Connect-Failed', userinfo.un + ' is trying to connect with incorrect credentials.', 'yellow', 'Connection');
                                }
                            });	

                           //curUser.un = userinfo.un;
                           //core.users.push( curUser );
                           //resultee.ca = 0;
                           //callback( resultee );	
                        }

                        else
                        {
                            resultee.ca = 3;
                            socket.emit('rejected', resultee);
                            core.debug.download(resultee);

                            core.data.stats.authError += 1;
                            core.debug.log('Connect-Forbid', 'IP: ' + curUser.ia + ' was rejected with invalid authKey: ' + userinfo.ak + '.', 'red', 'Connection');
                        }
                    }

                    else
                    {
                        resultee.ca = 3;
                        socket.emit('rejected', resultee);
                        core.debug.download(resultee);

                        core.data.stats.authError += 1;
                        core.debug.log('Connect-Forbid', 'IP: ' + curUser.ia + ' is trying to connect with undefined authKey.', 'red', 'Connection');
                    }
                }

                else
                {
                    resultee.ca = 3;
                    socket.emit('rejected', resultee);
                    core.debug.download(resultee);

                    core.debug.log('Connect-Invalid', ' IP: ' + curUser.ia + ' is trying to connect with invalid arguments!', 'red','Connection');
                }
            });
        //#endregion
        
        //#region RECONNECTION. - Check!
            socket.on('reconnect', function(userinfo, callback)
            {
                var resultee = {};
                    resultee.id = curUser.id;
                
                if(typeof userinfo != 'undefined' && typeof callback === 'function')
                {
                    core.debug.upload(userinfo);
                    
                    if(typeof userinfo.ak != 'undefined')
                    {
                        if(userinfo.ak == core.admin.authKey)
                        {
                            core.data.signin(userinfo.un, userinfo.pw, function(returnee)
                            {							
                                if(returnee == 'success') { resultee.ca = 0; }
                                else if(returnee == 'notfound') { resultee.ca = 1; }
                                else if(returnee == 'incorrect') { resultee.ca = 2; }
                                else { resultee.ca = 3; }
                                
                                if(returnee == 'success')
                                {
                                    curUser.un = userinfo.un;
                                    core.users.push( curUser );
            
                                    callback( resultee ); //return user profile!
                                    core.debug.download( resultee );
                                
                                    core.data.stats.reconnection += 1;
                                    core.debug.log('Reconnect-Success', 'IP: ' + curUser.ia + ' ID: ' + curUser.id + ' UN: ' + curUser.un 
                                        + ' is reconnected! | Online: ' + core.users.length, 'white', 'Connection');
                                }

                                else
                                {
                                    callback( resultee );
                                    core.debug.download(resultee);

                                    core.data.stats.authError += 1;
                                    core.debug.log('Reconnect-Failed', userinfo.un + ' is trying to connect with incorrect credentials.', 'yellow', 'Connection');
                                }
                            });	

                           //curUser.un = userinfo.un;
                           //core.users.push( curUser );
                           //resultee.ca = 0;
                           //callback( resultee );
                        }

                        else
                        {
                            resultee.ca = 3;
                            socket.emit('rejected', resultee);
                            core.debug.download(resultee);

                            core.data.stats.authError += 1;
                            core.debug.log('Reconnect-Forbid', 'IP: ' + curUser.ia + ' was rejected with invalid authKey: ' + userinfo.ak + '.', 'red', 'Connection');
                        }
                    }

                    else
                    {
                        resultee.ca = 3;
                        socket.emit('rejected', resultee);
                        core.debug.download(resultee);

                        core.data.stats.authError += 1;
                        core.debug.log('Reconnect-Forbid', 'IP: ' + curUser.ia + ' is trying to reconnect with undefined authKey.', 'red', 'Connection');
                    }
                }

                else
                {
                    resultee.ca = 3;
                    socket.emit('rejected', resultee);
                    core.debug.download(resultee);

                    core.debug.log('Reconnect-Invalid', 'IP: ' + curUser.ia + ' is trying to connect with invalid arguments!', 'red', 'Connection');
                }
            });
        //#endregion
        
        //#region DISCONNECTION. - Check!
            socket.on('disconnect', function(callback)
            {
                if(core.users.length > 0)
                {
                    core.find.user(curUser.id, function(userEntry)
                    {
                        if(userEntry.exist)
                        {
                            core.users.splice(userEntry.index, 1);
                        }
                    });

                    core.data.stats.disconnection += 1;
                    core.debug.log('Disconnected', 'IP: ' + curUser.ia + ' ID: ' + curUser.id + ' UN: ' + curUser.un 
                        + ' is disconnected! | Online: ' + core.users.length, 'white', 'Connection');							
                }
                
                core.find.channel(curUser.ci, function(chanFinds)
                {
                    if(chanFinds.exist)
                    {
                        var channelUser = {};
                            channelUser.userIdentity = curUser.id;
                            channelUser.channelIndex = chanFinds.index;
                                    
                        core.find.client(channelUser, function(userFinds)
                        {
                            if(userFinds.exist)
                            {
                                //socket.leave( curUser.ci ); //Socket is disconnected no need to.

                                //Send leaved event to all peer so that they will know.
                                socket.to(core.channels[chanFinds.index].id).emit('leaved', core.channels[chanFinds.index].us[userFinds.index]);

                                //For each the users in this channel and calculate data to send.
                                for(ig = 0; ig < core.channels[chanFinds.index].us.length; ig++)
                                {
                                    if(curUser.id != core.channels[chanFinds.index].us[ig].id)
                                    {
                                        core.debug.download(core.channels[chanFinds.index].us[userFinds.index]);
                                    }
                                }

                                //Remove the users in the current channel.
                                core.channels[chanFinds.index].us.splice( userFinds.index, 1 );
                                //delete channels[chanFinds.index].us[userFinds.index].obj;

                                var curChannel = JSON.parse(JSON.stringify(core.channels[chanFinds.index]));

                                if(core.channels[chanFinds.index].us.length == 0)
                                {
                                    core.channels.splice( chanFinds.index, 1 );

                                    core.debug.log('Channel-Closed', 'IP: ' + curUser.ia + ' ID: ' + curUser.id + ' UN: ' + curUser.un + ' closed the C#' 
                                        + curChannel.id + ' | Channels: ' + core.channels.length, 'white', 'Channel');					
                                }

                                else
                                {
                                    core.debug.log('Channel-Leaved', 'IP: ' + curUser.ia + ' ID: ' + curUser.id + ' UN: ' + curUser.un + ' leaved the C#' 
                                        + curChannel.id + ' Subscribers: ' + curChannel.us.length, 'white', 'Channel');							
                                }
                            }
                        });
                    }
                });
            });
        //#endregion
        
        //#region AUTO MATCH MAKING. - Done!
            socket.on('auto', function(channelinfo, callback)
            {
                var resultee = {};
                    resultee.id = curUser.id;
                
                if(typeof channelinfo != 'undefined' && typeof callback === 'function')
                {
                    core.debug.upload(channelinfo);
                    
                    if(typeof channelinfo.vt != 'undefined' && typeof channelinfo.mc != 'undefined')
                    {					
                        var matchMake = {};
                        
                        if(curUser.ci == 'Null')
                        {
                            //Try to find the channel inside the channel list.
                                var chanExist = false;
                                var chanIndex = 0;
                                if(core.channels.length > 0 )
                                {
                                    for(i = 0; i < core.channels.length; i++)
                                    {
                                        if(core.channels[i].vt == channelinfo.vt && core.channels[i].us.length < core.channels[i].mc)
                                        {
                                            chanExist = true;
                                            chanIndex = i; 
                                            break;
                                        }
                                    }
                                }
                            //Try to find the channel inside the channel list.

                            //Create or Join a channel.
                                var newUser = {};
                                    newUser.id = curUser.id;
                                    newUser.obj = [];

                                if(chanExist) //Channel does exist and try to join on it.
                                {
                                    //Push new user to the channel user list on JSON.
                                    core.channels[chanIndex].us.push( newUser );
            
                                    //Internally join user to the target channel.
                                    socket.join( core.channels[chanIndex].id );
            
                                    //Filling the current channel id of the current user trigger the event.
                                    curUser.ci = core.channels[chanIndex].id;
            
                                    //Emit an event inside letting the other user know new user joined.
                                    socket.to(curUser.ci).emit('joined', newUser);
                                    for(it = 1; it < core.channels[chanIndex].us.length; it++)
                                    {
                                        core.debug.download(core.channels[chanIndex].us[it]);
                                    }

                                    matchMake.ci = core.channels[chanIndex].id;
                                }

                                else //Channel does not exist so create new.
                                {
                                    //Create channel instance.
                                    var newChannel = {};

                                        //Use the id of the first user for the id of this channel.
                                        newChannel.id = curUser.id;

                                        //Check if cn is null then assign 'Channel#index'.
                                        if(channelinfo.cn != '') { newChannel.cn = channelinfo.cn; }
                                        else { newChannel.cn = 'Channel#' + (core.channels.length + 1); }

                                        //Check vt of match is null then set to default.
                                        if(channelinfo.vt != '') { newChannel.vt = channelinfo.vt; }
                                        else { newChannel.vt = 'Default'; }

                                        //Declare the maximum connection from first user or by default in json.
                                        if(channelinfo.mc != '') { newChannel.mc = channelinfo.mc; }
                                        else { newChannel.mc = 50; }

                                        //Added more info about the match like date it was created and many more.
                                        newChannel.ct = new Date().toLocaleString();

                                        //Create an empty array of users in the previous channel created and add new user.
                                        newChannel.us = [];
                                        newChannel.us.push( newUser );

                                    //Push the newly created channel to the list.
                                    core.channels.push( newChannel );

                                    //Make a reference to the channel index to emit event back to the user called.
                                    chanIndex = core.channels.length - 1;

                                    //Filling the current channel id of the current user trigger the event.
                                    curUser.ci = newChannel.id;

                                    //Internally added new socket groups to the server.
                                    socket.join( newChannel.id );

                                    matchMake.ci = core.channels[core.channels.length - 1].id;
                                }
                            //Create or Join a channel.

                            //Server Information Update
                                core.data.stats.auto += 1;

                                //Emit event back to the user called.
                                matchMake.mr = 0;
                                callback( matchMake ); //channels[chanIndex] );
                                core.debug.download( matchMake ); //channels[chanIndex] );

                                core.debug.log('Match-Auto-Success', 'ID: ' + core.channels[chanIndex].id + ' CN: ' + core.channels[chanIndex].cn 
                                    + ' Subscribers: ' + core.channels[chanIndex].us.length + '/' + core.channels[chanIndex].mc 
                                    + ' | Channels: ' + core.channels.length, 'white', 'MatchMake');
                            //Server Information Update
                        }

                        else
                        {
                            //Currently on a channel!
                            matchMake.mr = 1;
                            callback( matchMake ); //channels[chanIndex] );
                            core.debug.download( matchMake ); //channels[chanIndex] );
                        }
                    }

                    else
                    {
                        resultee.ca = 3;
                        socket.emit('rejected', resultee);
                        core.debug.download(resultee);

                        core.data.stats.authError += 1;
                        core.debug.log('Match-Auto-Forbid', 'IP: ' + curUser.ia + ' ' + curUser.un + ' is trying to match with undefined channelInfo.', 'red', 'MatchMake');
                    }
                }

                else
                {
                    resultee.ca = 3;
                    socket.emit('rejected', resultee);
                    core.debug.download(resultee);

                    core.debug.log('Match-Auto-Invalid', ' IP: ' + curUser.ia + ' ' + curUser.un + ' is trying to match with invalid arguments!', 'red', 'MatchMake');
                }
            });
		//#endregion

		//#region CREATE MATCH MAKING. - Done!
		socket.on('create', function(channelinfo, callback)
		{
			var resultee = {};
				resultee.id = curUser.id;
			
			if(typeof channelinfo != 'undefined' && typeof callback === 'function')
			{
				core.debug.upload(channelinfo);
				
				if(typeof channelinfo.vt != 'undefined' && typeof channelinfo.mc != 'undefined')
				{					
					var matchMake = {};
					
					if(curUser.ci == 'Null')
					{
						//Try to find the channel inside the channel list.
							var chanExist = false;
							var chanIndex = 0;
							if(core.channels.length > 0 )
							{
								for(i = 0; i < core.channels.length; i++)
								{
									if(core.channels[i].cn == channelinfo.cn && core.channels[i].vt == channelinfo.vt)
									{
										chanExist = true;
										chanIndex = i; 
										break;
									}
								}
							}
						//Try to find the channel inside the channel list.

						//Create or Join a channel.
							var newUser = {};
								newUser.id = curUser.id;
								newUser.obj = [];

							if(chanExist) //Channel exist and try to join on it.
							{
								matchMake.mr = 1;
								callback( matchMake ); //channels[chanIndex] );
								core.debug.download( matchMake ); //channels[chanIndex] );
							}

							else //Channel does not exist so create new.
							{
								//Create channel instance.
								var newChannel = {};

									//Use the id of the first user for the id of this channel.
									newChannel.id = curUser.id;

									//Check if cn is null then assign 'Channel#index'.
									if(channelinfo.cn != '') { newChannel.cn = channelinfo.cn; }
									else { newChannel.cn = 'Channel#' + (core.channels.length + 1); }

									//Check vt of match is null then set to default.
									if(channelinfo.vt != '') { newChannel.vt = channelinfo.vt; }
									else { newChannel.vt = 'Default'; }

									//Declare the maximum connection from first user or by default in json.
									if(channelinfo.mc != '') { newChannel.mc = channelinfo.mc; }
									else { newChannel.mc = 50; }

									//Added more info about the match like date it was created and many more.
									newChannel.ct = new Date().toLocaleString();

									//Create an empty array of users in the previous channel created and add new user.
									newChannel.us = [];
									newChannel.us.push( newUser );

								//Push the newly created channel to the list.
								core.channels.push( newChannel );

								//Make a reference to the channel index to emit event back to the user called.
								chanIndex = core.channels.length - 1;

								//Filling the current channel id of the current user trigger the event.
								curUser.ci = newChannel.id;

								//Internally added new socket groups to the server.
								socket.join( newChannel.id );

								//Server Information Update
								core.data.stats.create += 1;

								//Emit event back to the user called.
								matchMake.ci = core.channels[core.channels.length - 1].id;
								matchMake.mr = 0;
								callback( matchMake ); //channels[chanIndex] );
								core.debug.download( matchMake ); //channels[chanIndex] );

								core.debug.log('Match-Create-Success', 'ID: ' + core.channels[chanIndex].id + ' CN: ' + core.channels[chanIndex].cn 
									+ ' Subscribers: ' + core.channels[chanIndex].us.length + '/' + core.channels[chanIndex].mc 
									+ ' | Channels: ' + core.channels.length, 'white', 'MatchMake');
							}
						//Create or Join a channel.
					}

					else
					{
						//Currently on a channel!
						matchMake.mr = 1;
						callback( matchMake ); //channels[chanIndex] );
						core.debug.download( matchMake ); //channels[chanIndex] );
					}
				}

				else
				{
					matchMake.mr = 2;
					socket.emit('rejected', matchMake);
					core.debug.download(matchMake);

					core.data.stats.authError += 1;
					core.debug.log('Match-Create-Forbid', 'IP: ' + curUser.ia + ' ' + curUser.un + ' is trying to match with undefined channelInfo.', 'red', 'MatchMake');
				}
			}

			else
			{
				matchMake.mr = 2;
				socket.emit('rejected', matchMake);
				core.debug.download(matchMake);

				core.debug.log('Match-Create-Invalid', ' IP: ' + curUser.ia + ' ' + curUser.un + ' is trying to match with invalid arguments!', 'red', 'MatchMake');
			}
		});
		//#endregion

		//#region JOIN MATCH MAKING. - Done!
		socket.on('join', function(channelinfo, callback)
		{
			var resultee = {};
				resultee.id = curUser.id;
			
			if(typeof channelinfo != 'undefined' && typeof callback === 'function')
			{
				core.debug.upload(channelinfo);
				
				if(typeof channelinfo.cn != 'undefined' && typeof channelinfo.vt != 'undefined')
				{
					var matchMake = {};
					
					if(curUser.ci == 'Null')
					{
						//Try to find the channel inside the channel list.
						    var chanExist = false;
						    var chanIndex = 0;
							if(core.channels.length > 0 )
							{
								for(i = 0; i < core.channels.length; i++)
								{
									if(core.channels[i].cn == channelinfo.cn && core.channels[i].vt == channelinfo.vt && core.channels[i].us.length < core.channels[i].mc)
									{
										chanExist = true;
										chanIndex = i; 
										break;
									}
								}
							}
						//Try to find the channel inside the channel list.

						if(chanExist)
						{
							//Create an instance of the user to enter the match.
							var newUser = {};
								newUser.id = curUser.id;
								newUser.obj = [];

							//Push new user to the channel user list on JSON.
							core.channels[chanIndex].us.push( newUser );

							//Internally join user to the target channel.
							socket.join( core.channels[chanIndex].id );

							//Filling the current channel id of the current user trigger the event.
							curUser.ci = core.channels[chanIndex].id;

							//Emit an event inside letting the other user know new user joined.
							socket.to(curUser.ci).emit('joined', newUser);
							for(it = 1; it < core.channels[chanIndex].us.length; it++)
							{
								core.debug.download(newUser);
							}

							//Emit event back to the user called.
							matchMake.ci = core.channels[core.channels.length - 1].id;
							matchMake.mr = 0;
							callback( matchMake ); //channels[chanIndex] );
							core.debug.download( matchMake ); //channels[chanIndex] );

							core.debug.log('Match-Create-Success', 'ID: ' + core.channels[chanIndex].id + ' CN: ' + core.channels[chanIndex].cn 
								+ ' Subscribers: ' + core.channels[chanIndex].us.length + '/' + core.channels[chanIndex].mc 
								+ ' | Channels: ' + core.channels.length, 'white', 'MatchMake');
						}

						else
						{
							//Currently on a channel!
							matchMake.mr = 1;
							callback( matchMake ); //channels[chanIndex] );
							core.debug.download( matchMake ); //channels[chanIndex] );
						}
					}

					else
					{
						//Currently on a channel!
						matchMake.mr = 1;
						callback( matchMake ); //channels[chanIndex] );
						core.debug.download( matchMake ); //channels[chanIndex] );
					}
				}

				else
				{
					resultee.ca = 2;
					socket.emit('rejected', resultee);
					core.debug.download(resultee);
	
					core.data.stats.authError += 1;
					core.debug.log('Match-Join-Forbid', 'IP: ' + curUser.ia + ' ' + curUser.un + ' is trying to match with undefined channelInfo.', 'red', 'MatchMake');
				}
			}
	
			else
			{
				resultee.ca = 2;
				socket.emit('rejected', resultee);
				core.debug.download(resultee);
	
				core.debug.log('Match-Join-Invalid', ' IP: ' + curUser.ia + ' ' + curUser.un + ' is trying to match with invalid arguments!', 'red', 'MatchMake');
			}
		});
		//#endregion

		//#region LEAVE MATCH MAKING. - Done!
		socket.on('leave', function(leavedInfo, callback)
		{
			var resultee = {};
				resultee.id = curUser.id;
			
			if(typeof leavedInfo != 'undefined' && typeof callback === 'function')
			{
				core.debug.upload(leavedInfo);
				var matchMake = {};
				
				if(core.channels.length > 0 && curUser.ci != 'Null')
				{
					core.find.channel(curUser.ci, function(chanFinds)
					{
						if(chanFinds.exist)
						{
							var channelUser = {};
								channelUser.userIdentity = curUser.id;
								channelUser.channelIndex = chanFinds.index;
								
							core.find.client(channelUser, function(userFinds)
							{
								if(userFinds.exist)
								{
									//Leave the user from socket list channel.
									//delete channels[chanFinds.index].us[userFinds.index].obj;
									socket.leave( curUser.ci );

									//log to data all traffic to other peer because of this event.
									socket.to(curUser.ci).emit('leaved', core.channels[chanFinds.index].us[userFinds.index]);
									for(iz = 1; iz < core.channels[chanFinds.index].us.length; iz++)
									{
										core.debug.download(core.channels[chanFinds.index].us[iz]);
									}

									//Make the online user channel equal to null.
									curUser.ci = 'Null';

									//Just to reset the previous data and will force to sync again.
									prevDataString = '';

									//Remove the user from the user list on active in channel.
									var curChannel = JSON.parse(JSON.stringify(core.channels[chanFinds.index]));
									core.channels[chanFinds.index].us.splice( userFinds.index, 1 );
									core.data.stats.leave += 1;									

									if(core.channels[chanFinds.index].us == 0)
									{
										matchMake.mr = 0;
										core.debug.download(matchMake);
										callback( matchMake );
										core.channels.splice( chanFinds.index, 1 );

										core.debug.log('Channel-Closed', 'IP: ' + curUser.ia + ' ID: ' + curUser.id + ' UN: ' + curUser.un + ' closed the C#' 
											+ curChannel.id + ' | Channels: ' + core.channels.length, 'white', 'Channel');	
									}

									else
									{
										matchMake.mr = 0;
										core.debug.download(matchMake);
										callback( matchMake ); 
							
										core.debug.log('Channel-Leaved', 'IP: ' + curUser.ia + ' ID: ' + curUser.id + ' UN: ' + curUser.un + ' leaved the C#' 
											+ curChannel.id + ' Subscribers: ' + curChannel.us.length, 'white', 'Channel');		
									}
								}
							});		
						}

						else
						{
							//Currently on a channel!
							matchMake.mr = 1;
							callback( matchMake ); //channels[chanIndex] );
							core.debug.download( matchMake ); //channels[chanIndex] );
						}
					});
				}

				else
				{
					//Currently on a channel!
					matchMake.mr = 1;
					callback( matchMake ); //channels[chanIndex] );
					core.debug.download( matchMake ); //channels[chanIndex] );
				}
			}
	
			else
			{
				resultee.ca = 2;
				socket.emit('rejected', resultee);
				core.debug.download(resultee);
	
				core.debug.log('Match-Leaved-Invalid', ' IP: ' + curUser.ia + ' ' + curUser.un + ' is trying to match with invalid arguments!', 'red', 'MatchMake');
			}
		});
		//#endregion

		//#region INSTANTIATION. - Done!

			//The main requirement for server to successfully initiate an INSTANCE EVENT is:
			// >Equal authKey from client and server.
			// >Instancy object should be declare on client.
			// >Callback should be declare on client.
			//Note: If conditions are not met, nothing happens. From client and server.

			socket.on('instance', function(instancy, callback)
			{
				var resultee = {};
					resultee.id = curUser.id;
				
				if(typeof instancy != 'undefined' && typeof callback === 'function')
				{
					core.debug.upload(instancy);

					if(typeof instancy.itc != 'undefined' && typeof instancy.pfb != 'undefined' && typeof instancy.pos != 'undefined' && typeof instancy.rot != 'undefined')
					{
						core.find.channel(curUser.ci, function(chanFinds)
						{
							if(chanFinds.exist)
							{
								var channelUser = {};
									channelUser.userIdentity = curUser.id;
									channelUser.channelIndex = chanFinds.index;
									
								core.find.client(channelUser, function(userFinds)
								{
									if(userFinds.exist)
									{
										var instance = {};
											instance.id = instancy.itc;
											instance.pfb = instancy.pfb;
											instance.pos = instancy.pos;											
											instance.rot = instancy.rot;
											instance.sca = 'f';
											instance.ani = 'f';
											instance.sta = 'f';
											instance.chi = 'f';
										core.channels[chanFinds.index].us[userFinds.index].obj.push(instance);

										instancy.id = curUser.id;
										//Sending to other PEERS.
										socket.to(curUser.curcid).emit('instanced', instancy);
										//Send back to CLIENT.
										callback( instancy );
										core.debug.download( instancy );

										core.debug.log('User-View-Intance', 'ID: ' + curUser.id + ' UN: ' + curUser.un + ' instantiated a USocketView.', 'white' , 'Instance');
									}
								});		
							}
						});
					}

					else
					{
						resultee.ca = 3;
						socket.emit('rejected', resultee);
						core.debug.download(resultee);

						core.data.stats.authError += 1;
						core.debug.log('Instance-Forbid', 'ID: ' + curUser.id + ' is trying to instanstiate with undefined channelInfo.', 'Instance');
					}
				}

				else
				{
					resultee.ca = 3;
					socket.emit('rejected', resultee);
					core.debug.download(resultee);

					core.debug.log('Instance-Invalid', ' ID: ' + curUser.id + ' is trying to instanstiate with invalid arguments!', 'Instance');
				}
			});
		//#endregion

		//#region SYNCHRONIZATION. - Done!
		
			//The main requirement for server to successfully synchronization an SYNC EVENT is:
			// >Equal authKey from client and server.
			// >TranState object should be declare on client.
			// >Callback should be declare on client.
			//Note: If conditions are not met, nothing happens. From client and server.
			var prevDataString = '';
			socket.on('m', function(tranState, callback)
			{												
				if(typeof tranState != 'undefined' && typeof callback === 'function')
				{					
					core.find.channel(curUser.ci, function(chanFinds)
					{
						if(chanFinds.exist)
						{
							var channelUser = {};
								channelUser.userIdentity = curUser.id;
								channelUser.channelIndex = chanFinds.index;
								
							core.find.client(channelUser, function(userFinds)
							{
								if(userFinds.exist)
								{
									if(tranState != '0')
									{
										core.debug.upload(tranState);
										
										for(i = 0; i < tranState.obj.length; i++)
										{
											channelUser.userIndex = userFinds.index;
											channelUser.userInstance = tranState.obj[i].states[tranState.obj[i].states.length-1]; //Instance Id, last index.
								
											core.find.instance(channelUser, function(instance)
											{											
												if(instance.exist)
												{														
													if(typeof tranState.obj[i] != 'undefined')
													{														
														var currentIndex = 6; //pos[0], rot[1], sca[2], ani[3], sta[4], chi[5]
																		
														//Update server status of the current client requesting.
														if(tranState.obj[i].states[0] == 't')
														{
															core.channels[chanFinds.index].us[userFinds.index].obj[instance.index].pos = tranState.obj[i].states[currentIndex];
															currentIndex = currentIndex + 1;
														}
																	
														if(tranState.obj[i].states[1] == 't')
														{
															core.channels[chanFinds.index].us[userFinds.index].obj[instance.index].rot = tranState.obj[i].states[currentIndex];
															currentIndex = currentIndex + 1;
														}
				
														if(tranState.obj[i].states[2] == 't')
														{
															core.channels[chanFinds.index].us[userFinds.index].obj[instance.index].sca = tranState.obj[i].states[currentIndex];
															currentIndex = currentIndex + 1;
														}
				
														if(tranState.obj[i].states[3] == 't')
														{
															core.channels[chanFinds.index].us[userFinds.index].obj[instance.index].ani = tranState.obj[i].states[currentIndex];
															currentIndex = currentIndex + 1;
														}
				
														if(tranState.obj[i].states[4] == 't')
														{
															core.channels[chanFinds.index].us[userFinds.index].obj[instance.index].sta = tranState.obj[i].states[currentIndex];
															currentIndex = currentIndex + 1;
														}
				
														if(tranState.obj[i].states[5] == 't')
														{
															core.channels[chanFinds.index].us[userFinds.index].obj[instance.index].chi = tranState.obj[i].states[currentIndex];
														}
													}
												}
											});
										}
									}

									var channelUsers = {};
										channelUsers.us = JSON.parse(JSON.stringify(core.channels[chanFinds.index].us));
										for(n = 0; n < channelUsers.us.length; n++)
										{
											if(channelUsers.us[n].id == curUser.id)
											{
												channelUsers.us.splice(n, 1);
											}
										}
										//Removed curUserID instance!
									var curDataString = JSON.stringify(channelUsers);
									if(JSON.stringify(channelUsers) != prevDataString)
									{
										callback(channelUsers);
										core.debug.download(channelUsers);
										prevDataString = curDataString;
									}
								}
							});
						}
					});
				}
			});

			socket.on('p', function(upos)
			{												
				if(typeof upos != 'undefined')
				{					
					core.find.channel(curUser.ci, function(chanFinds)
					{
						if(chanFinds.exist)
						{
							var channelUser = {};
								channelUser.userIdentity = curUser.id;
								channelUser.channelIndex = chanFinds.index;
								
							core.find.client(channelUser, function(userFinds)
							{
								if(userFinds.exist)
								{
									core.debug.upload(upos);
									
									channelUser.userIndex = userFinds.index;
									channelUser.userInstance = upos.i; //Instance Id upos.v - value i - id

									core.find.instance(channelUser, function(instance)
									{	
										if(instance.exist)
										{	
											core.channels[chanFinds.index].us[userFinds.index].obj[instance.index].pos = upos.v;
										}
									});
								}
							});
						}
					});
				}
			});

			socket.on('r', function(urot)
			{												
				if(typeof urot != 'undefined')
				{					
					core.find.channel(curUser.ci, function(chanFinds)
					{
						if(chanFinds.exist)
						{
							var channelUser = {};
								channelUser.userIdentity = curUser.id;
								channelUser.channelIndex = chanFinds.index;
								
							core.find.client(channelUser, function(userFinds)
							{
								if(userFinds.exist)
								{
									core.debug.upload(urot);
									
									channelUser.userIndex = userFinds.index;
									channelUser.userInstance = urot.i; //Instance Id urot.v - value i - id

									core.find.instance(channelUser, function(instance)
									{	
										if(instance.exist)
										{	
											core.channels[chanFinds.index].us[userFinds.index].obj[instance.index].rot = urot.v;
										}
									});
								}
							});
						}
					});
				}
			});

			socket.on('s', function(usca)
			{												
				if(typeof usca != 'undefined')
				{					
					core.find.channel(curUser.ci, function(chanFinds)
					{
						if(chanFinds.exist)
						{
							var channelUser = {};
								channelUser.userIdentity = curUser.id;
								channelUser.channelIndex = chanFinds.index;
								
							core.find.client(channelUser, function(userFinds)
							{
								if(userFinds.exist)
								{
									core.debug.upload(usca);
									
									channelUser.userIndex = userFinds.index;
									channelUser.userInstance = usca.i; //Instance Id usca.v - value i - id

									core.find.instance(channelUser, function(instance)
									{	
										if(instance.exist)
										{	
											core.channels[chanFinds.index].us[userFinds.index].obj[instance.index].sca = usca.v;
										}
									});
								}
							});
						}
					});
				}
			});

			var userChanJson = [];
			socket.on('u', function(callback)
			{												
				if(typeof callback === 'function')
				{					
					core.find.channel(curUser.ci, function(chanFinds)
					{
						if(chanFinds.exist)
						{
							var channelUser = {};
								channelUser.userIdentity = curUser.id;
								channelUser.channelIndex = chanFinds.index;

							core.find.client(channelUser, function(userFinds)
							{
								if(userFinds.exist)
								{
									for(var usr = 0; usr < core.channels[chanFinds.index].us.length; usr++)
									{
										if(core.channels[chanFinds.index].us[usr].id != curUser.id)
										{
											var curDataString = JSON.stringify(userChanJson[usr]);
											if(curDataString != JSON.stringify(core.channels[chanFinds.index].us[usr]))
											{
												core.debug.download(core.channels[chanFinds.index].us[usr]);
												callback(core.channels[chanFinds.index].us[usr]);
												userChanJson = JSON.parse(JSON.stringify(core.channels[chanFinds.index].us));
											}
										}
									}
								}
							});
						}
					});
				}
			});
		//#endregion

		//#region EVENT TRIGGERS. - Done!
		
			//The main requirement for server to successfully synchronization an SYNC EVENT is:
			// >Equal authKey from client and server.
			// >Trigger object should be declare on client.
			// >Callback should be declare on client.
			//Note: If conditions are not met, nothing happens. From client and server.
			
			socket.on('trigger', function(trigger, callback)
			{												
				if(typeof trigger != 'undefined' && typeof callback === 'function')
				{
					core.debug.upload(trigger);
					
					core.find.channel(curUser.ci, function(chanFinds)
					{
						if(chanFinds.exist)
						{
							for(i = 0; i < core.channels[chanFinds.index].us.length; i++)
							{
								for(is = 0; is < core.channels[chanFinds.index].us[i].obj.length; is++)
								{
									if(core.channels[chanFinds.index].us[i].obj[is].id == trigger.itc)
									{
										trigger.id = core.channels[chanFinds.index].us[i].id;
										//trigger.itc, trigger.tKy, trigger.tVl
										socket.to(curUser.ci).emit('triggered', trigger);

										var returned = {};
											returned.returned = 0;
                                        core.debug.download(returned);
										callback(returned);
										//console.log('TRIGGER EVENT - ' + JSON.stringify(trigger));
									}
								}
							}
						}
					});
				}
			});
		//#endregion

		//#region MESSAGING. Done!
			socket.on('message', function(msgInfo, callback)
			{
				if(typeof msgInfo !== 'undefined' && typeof callback === 'function')
				{
					core.debug.upload(msgInfo);

					if(typeof msgInfo.mt != 'undefined' && typeof msgInfo.rv != 'undefined') // && typeof msgInfo.ct != 'undefined')
					{
						var sending = false;
						msgInfo.sd = curUser.un;
						
						if(msgInfo.mt == 0) //Public Message
						{
							core.data.stats.publicMessage += 1;
							//socket.broadcast.emit('messaged', msgInfo);
							for(var usri = 0; usri < core.users.length; usri++)
							{
								if(core.users[usri].ci == 'Null')
								{
									socket.broadcast.to(core.users[usri].si).emit('messaged', msgInfo);
									sending = true;
								}
							}
						}

						else if(msgInfo.mt == 1) //Private Message
						{
							for(var usri = 0; usri < core.users.length; usri++)
							{
								if(core.users[usri].id == msgInfo.rv)
								{
									core.data.stats.privateMessage += 1;
									socket.broadcast.to(core.users[usri].si).emit('messaged', msgInfo);
									sending = true;
									break;
								}
							}
						}

						else //Channel Message
						{
							if(curUser.ci != 'Null')
							{
								core.data.stats.channelMessage += 1;
								socket.to(curUser.ci).emit('messaged', msgInfo);
								sending = true;
							}
						}

						var msgCallback = {};

						if(sending)
						{
							msgCallback.msgStat = "Success";
							core.debug.download(msgCallback);
							callback( msgCallback ); 
						}

						else
						{
							msgCallback.msgStat = "Failed";
							core.debug.download(msgCallback);
							callback( msgCallback );
						}
					}

					else
					{
						msgCallback.msgStat = "Failed";
						core.debug.download(msgCallback);
						callback( msgCallback );
					}
				}
			});
		//#endregion

        //#region NATIVE EVENTS. - Pending!

			socket.on('sping', function(callback)
			{
				callback();
			});

			socket.on('open', function()
			{
				console.log( 'CALLBACK: open has been called!' );
			});
		
			socket.on('close', function ()
			{
				console.log('CALLBACK: close has been called!');
			});
		
			socket.on('error', function (err)
			{
				console.log('CALLBACK: error has been called!! ' + err);
			});

		//#endregion
    });
  
    core.web.init(core.cluster.worker);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 