//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var core = require('./core');

var Datastore = require('nedb'),
    server = new Datastore({ filename: 'stats_record/server.db', autoload: true }),
    member = new Datastore({ filename: 'stats_record/member.db', autoload: true }),
    connect = new Datastore({ filename: 'stats_record/connect.db', autoload: true }),
    channels = new Datastore({ filename: 'stats_record/channels.db', autoload: true }),
    users = new Datastore({ filename: 'stats_record/users.db', autoload: true });

var stats = {};
    stats.initDate = new Date().toLocaleString();
    stats.authError = 0;
    stats.connection = 0;
    stats.reconnection = 0;
    stats.disconnection = 0;
    stats.auto = 0;
    stats.create = 0;
    stats.join = 0;
    stats.leave = 0;
    stats.publicMessage = 0;
    stats.channelMessage = 0;
    stats.privateMessage = 0;
    stats.trafficUp = [];
    stats.trafficDown = [];
   
var prevLoggedUp = "";
var prevLoggedDown = "";
    setInterval(function()
    {
        if(stats.trafficUp.length > 0)
        {
            if(stats.trafficUp[stats.trafficUp.length - 1].timeLogged == prevLoggedUp)
            {
                stats.trafficUp[stats.trafficUp.length - 1].totalSize = 0;
            }

            prevLoggedUp = stats.trafficUp[stats.trafficUp.length - 1].timeLogged;
        }
    
        if(stats.trafficDown.length > 0)
        {
            if(stats.trafficDown[stats.trafficDown.length - 1].timeLogged == prevLoggedDown)
            {
                stats.trafficDown[stats.trafficDown.length - 1].totalSize = 0;
            }

            prevLoggedDown = stats.trafficDown[stats.trafficDown.length - 1].timeLogged;
        }
    
    }, 1000); 

module.exports = 
{
    stats,

    init: function()
    {
        connect.findOne({ key: 'value'}, function(errm, objm)
        {
            if(errm)
            {
                core.alert.log(core.logs[4].title, core.logs[4].info + 'Error: ' + err, 'red', 'Server');
            }

            else
            {
                if(objm == null)
                {
                    connect.insert(stats, function (err, obj) 
                    {
                        if(err)
                        {
                            core.alert.log(core.logs[4].title, core.logs[4].info + 'Error: ' + err, 'red', 'Server');
                        }

                        else
                        {
                            core.alert.log(core.logs[3].title, core.logs[3].info, 'green', 'Server');
                        }                        
                    });
                }

                else
                {
                    connect.update(stats, function (err, obj) 
                    {
                        if(err)
                        {
                            core.alert.log(core.logs[4].title, core.logs[4].info + 'Error: ' + err, 'red', 'Server');
                        }

                        else
                        {
                            core.alert.log(core.logs[3].title, core.logs[3].info, 'green', 'Server');
                        } 
                    });
                }
            }
        });
    },

    signup: function(regMember, callback)
    {  
        var username = {};
            username.username = regMember.username;

        var email = {};
            email.email = regMember.email;
        
        member.findOne(username, function(errm, objun)
        {
            if(errm)
            {
                callback('error');
                alert.log(core.logs[3].title, core.logs[3].info + 'Error: ' + errm)
            }

            else
            {
                if(objun == null)
                {
                    member.findOne(email, function(errs, objem)
                    {
                        if(errs)
                        {
                            callback('error');
                            alert.log(core.logs[3].title, core.logs[3].info + 'Error: ' + errs)
                        }

                        else
                        {
                            if(objem == null)
                            {
                                member.insert(regMember, function (err, obj) 
                                {
                                    if(err)
                                    {
                                        callback('error');
                                        alert.log(core.logs[3].title, core.logs[3].info + 'Error: ' + err)
                                    }
                
                                    else
                                    {
                                        callback('success');
                                    }
                                });
                            }

                            else
                            {
                                callback('email');
                            }
                        }
                    });
                }
    
                else
                {
                    callback('username');
                }
            }
        });
    },

    signin: function(username, password, callback)
    {
        var uname = {};
            uname.username = username;
        
        member.findOne(uname, function(err, obj)
        {
            if(err)
            {
                callback('error');
                alert.log(core.logs[3].title, core.logs[3].info + 'Error: ' + err)
            }

            else
            {
                if(obj == null)
                {
                    callback('notfound');
                }

                else
                {
                    if(password == obj.password)
                    {
                        callback('success');
                    }

                    else
                    {
                        callback('incorrect');
                    }
                }
            }
        });
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////