
class Demoguy {
    constructor() {

    }

    showMessage( isLocal, dat ) {
        if(isLocal) {
            $(".msg_history").append("<div class='outgoing_msg'><div class='sent_msg'><p>"+ 
                dat.message+"</p><span class='time_date' style='text-align: right;'> "+
                dat.datestamp+" | Today</span></div> </div>");

            //Reset scroll view.
            var msgScroller = document.getElementById('messageContainer');
            msgScroller.scrollTop = msgScroller.scrollHeight;
        } else {
            //<img src='https://ptetutorials.com/images/user-profile.png' alt='sunil'> - replace fonst-awesome!
            $(".msg_history").append("<div class='incoming_msg'><div class='incoming_msg_img'><i class='fas fa-user-circle fa-2x'></i>"+
            "</div><div class='received_msg'><div class='received_withd_msg'><p>"+dat.username+" [PUBLIC]: "+dat.message+"</p><span class='time_date' style='text-align: left;'> "+
            dat.datestamp+" | Today</span></div></div></div>");
        }

        //Delete or resuse the last item index.
        if($("#messageContainer").children().length > 60) {
            $('#messageContainer').children().first().remove();
            console.log("Message Count: " + $("#messageContainer").children().length);
        }
    }

    verifyToken( userData ) {
        return typeof localStorage['user'] !== 'undefined' ? true : false;
    }

    getRandomString(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    } 
}

//#region SERVER CONNECTION

    $(function () {

         //Set the target host.
         const usn_server = 'localhost';

         //Class for performing USocketNet demo.
         const demoguy = new Demoguy();

        if(demoguy.verifyToken(localStorage) && page == 'settings') {
            const curUser = JSON.parse(localStorage['user']);

            $("#userdname").html("Your content here...");
            $("#useremail").html("Your content here...");
            $("#userreg").html("Your content here...");

            $("#appname").html("Your content here...");
            $("#appdesc").html("Your content here...");
            $("#appurl").html("Your content here...");

            $("#userphoto").attr("src", curUser.avatar);
            $("#userdname").html('Hello! ' + curUser.dname);
            $("#useruname").html('@' + curUser.uname);
            $("#userroles").html( 'Role: ' + curUser.roles[0] );
            $("#useremail").html( curUser.email );
            $("#userwpid").html( 'WordPress ID: '+curUser.wpid );
            $("#usersess").html( curUser.session );
        }

        //Check if localStorage is set then continue else redirect back to home.
        if( demoguy.verifyToken(localStorage) && page != 'settings' ) { 
            
            const curUser = JSON.parse(localStorage['user']);
            let serverStatus = [];
            $("#userphoto").attr("src", curUser.avatar);

            //Declaration of 3 different type of server.
            let usnList = []; const authToken = { wpid: curUser.wpid, snid: curUser.snid };
                usnList.push(new USocketNet('master', usn_server, authToken)); 
                usnList.push(new USocketNet('message', usn_server, authToken)); 
                usnList.push(new USocketNet('match', usn_server, authToken)); 
                usnList.push(new USocketNet('game', usn_server, authToken)); 

            //Connect all USocketNet instance.
            usnList.forEach(curUsn => {
                curUsn.connect();
                if(curUsn.serverType == 'master') {
                    curUsn.on('svr-status', ( status ) => {
                        if(serverStatus.length > 0) {
                            serverStatus.push(status);
                            serverStatus.shift();
                        } else {
                            serverStatus = status;
                        }
                    })
                } else if(curUsn.serverType == 'message') {
                    if(page == 'message') {
                        curUsn.on('msg-public', ( dat ) => {
                            demoguy.showMessage(curUser.wpid == dat.sender ? true : false, dat);
                        })
                    }
                }
                curUsn.on('svr-connect', ( data ) => {
                    if( page === 'dashboard') {
                        let targ = 'undefined';
                        if(data.serverType == 'master') {
                            $('#masterConStat').html( 'ONLINE' );
                            $('#masterConStat').removeClass('btn-secondary');
                            $('#masterConStat').addClass('btn-success');
                            targ = 'masterCon';
                        } else if(data.serverType == 'message') {
                            $('#chatConStat').html( 'ONLINE' );
                            $('#chatConStat').removeClass('btn-secondary');
                            $('#chatConStat').addClass('btn-success');
                            targ = 'chatCon';
                        } else if(data.serverType == 'match') {
                            $('#matchConStat').html( 'ONLINE' );
                            $('#matchConStat').removeClass('btn-secondary');
                            $('#matchConStat').addClass('btn-success');
                            targ = 'matchCon';
                        } else if(data.serverType == 'game') {
                            $('#gameConStat').html( 'ONLINE' );
                            $('#gameConStat').removeClass('btn-secondary');
                            $('#gameConStat').addClass('btn-success');
                            targ = 'gameCon';
                        }
                        document.getElementById(targ).innerHTML = data.socketid+ '<br><strong>Socket ID</strong> <br><br>' + data.port + '<br><strong>Port Forwarded</strong>';
                    }
    
                    console.log(' Connected @ ' +data.serverType+ '.');
                });

                curUsn.on('svr-reconnect', ( data ) => {
                    if( page === 'dashboard') {
                        let targ = 'undefined';
                        if(data.serverType == 'master') {
                            $('#masterConStat').html( 'ONLINE' );
                            $('#masterConStat').removeClass('btn-secondary');
                            $('#masterConStat').addClass('btn-success');
                            targ = 'masterCon';
                        } else if(data.serverType == 'message') {
                            $('#chatConStat').html( 'ONLINE' );
                            $('#chatConStat').removeClass('btn-secondary');
                            $('#chatConStat').addClass('btn-success');
                            targ = 'chatCon';
                        } else if(data.serverType == 'match') {
                            $('#matchConStat').html( 'ONLINE' );
                            $('#matchConStat').removeClass('btn-secondary');
                            $('#matchConStat').addClass('btn-success');
                            targ = 'matchCon';
                        } else if(data.serverType == 'game') {
                            $('#gameConStat').html( 'ONLINE' );
                            $('#gameConStat').removeClass('btn-secondary');
                            $('#gameConStat').addClass('btn-success');
                            targ = 'gameCon';
                        }
                        document.getElementById(targ).innerHTML = data.socketid+ '<br><strong>Socket ID</strong> <br><br>' + data.port + '<br><strong>Port Forwarded</strong>';
                    }
    
                    console.log(' Reconnected @ ' +data.serverType+ '.');
                });
    
                curUsn.on('svr-ping', ( data ) => {
                    let targ = 'undefined';
                    if(data.serverType == 'master') {
                        targ = '#masterping';
                    } else if(data.serverType == 'message') {
                        targ = '#chatping';
                    } else if(data.serverType == 'match') {
                        targ = '#gameping';
                    }
    
                    $(targ).html(data.latency);
                });

                curUsn.on('svr-disconnect', ( data ) => {
                    if(data.serverType == 'master') {
                        $('#masterConStat').html( 'OFFLINE' );
                        $('#masterConStat').removeClass('btn-success');
                        $('#masterConStat').addClass('btn-secondary');
                    } else if(data.serverType == 'message') {
                        $('#chatConStat').html( 'OFFLINE' );
                        $('#chatConStat').removeClass('btn-success');
                        $('#chatConStat').addClass('btn-secondary');
                    } else if(data.serverType == 'match') {
                        $('#gameConStat').html( 'OFFLINE' );
                        $('#gameConStat').removeClass('btn-success');
                        $('#gameConStat').addClass('btn-secondary');
                    }

                    console.log(' Disconnected @ ' +data.serverType+ '.');
                });

            });
            
            //Automatically send public message if document.getElementById('enableChatBot').checked is true.
            setInterval(() => {
                if( page === 'message') {
                    if(document.getElementById('chatbot_status').checked) {
                        usnList[1].sendMessage(demoguy.getRandomString(20), (res) => {
                            if(res.status === 'success') {
                                demoguy.showMessage(true, res);
                            }
                        });
                    }
                }
            }, 1000);
            
            //Just a chat sending mechanism.
            $('#sendChatMsg').submit(function(e) {
                e.preventDefault(); //prevents page reloading.
                if( $('#m').val() == 'logout' ) {
                    localStorage.clear();
                    window.location.replace("http://"+window.location.host+"/demoguy");
                    $('#m').val('');
                } else if( $('#m').val() ) {
                    usnList[1].sendMessage($('#m').val(), (res) => {
                        if(res.status === 'success') {
                            demoguy.showMessage(true, res);
                        }
                    });
                    $('#m').val('');
                } else {
                    console.log( 'Input value is not in the list of conditions.' );
                } return false;
            });
        
        }
        
    });

//#endregion
