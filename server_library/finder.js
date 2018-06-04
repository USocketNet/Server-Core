//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var core = require('./core');

module.exports = 
{
    //Check host used by client to connect if on allowed list.
    host: function(referrer, callback)
    {
        var found = false;

        for(iHost = 0; iHost < core.admin.allowedDomain.length; iHost++ )
        {
            if(core.admin.allowedDomain[iHost] + ':' + core.admin.serverPort == referrer)
            {
                found = true;
                break;
            }
        }

        callback(found);
    },

    user: function(userId, callback) //findUser
    {
        var findTargetUser = {};
            findTargetUser.index = 0;
            findTargetUser.exist = false;

        for(iuser = 0; iuser < core.users.length; iuser++ )
        {
            if(core.users[iuser].id == userId)
            {
                findTargetUser.index = iuser;
                findTargetUser.exist = true;
                break;
            }
        }

        callback(findTargetUser);
    },

    channel: function(channelId, callback) //findChannel
    {
        var findTargetChannel = {};
            findTargetChannel.index = 0;
            findTargetChannel.exist = false;

        for(ichans = 0; ichans < core.channels.length; ichans++ )
        {
            if(core.channels[ichans].id == channelId)
            {
                findTargetChannel.index = ichans;
                findTargetChannel.exist = true;
                break;
            }
        }

        callback(findTargetChannel);
    },
    
    client: function(clientInfo, callback) //findChannelUser
    {
        var findChanUser = {};
            findChanUser.index = 0;
            findChanUser.exist = false;

        for(icuser = 0; icuser < core.channels[clientInfo.channelIndex].us.length; icuser++ )
        {
            if(core.channels[clientInfo.channelIndex].us[icuser].id == clientInfo.userIdentity)
            {
                findChanUser.index = icuser;
                findChanUser.exist = true;
                break;
            }
        }

        callback(findChanUser);
    },

    instance: function(instanceInfo, callback) //findUserInstance
    {
        var findUserInstance = {};
            findUserInstance.index = 0;
            findUserInstance.exist = false;

        for(iuinstance = 0; iuinstance < core.channels[instanceInfo.channelIndex].us[instanceInfo.userIndex].obj.length; iuinstance++ )
        {
            if(core.channels[instanceInfo.channelIndex].us[instanceInfo.userIndex].obj[iuinstance].id == instanceInfo.userInstance)
            {
                findUserInstance.index = iuinstance;
                findUserInstance.exist = true;
                break;
            }
        }

        callback(findUserInstance);
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////