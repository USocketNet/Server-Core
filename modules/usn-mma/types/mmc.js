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

const _ = require('lodash')
const shortid = require('shortid');
const installLuaScripts = require('../libs/redis')

const config = require('usn-utils').config;
const redisMaster = require('usn-libs').redis.init(config.redis())
const redis = redisMaster.select(1);

const pendingKey = 'events/pending'
const activeKey  = 'events/active'

class usn_mmc {

    constructor() {
        //Config Container.
        installLuaScripts(redis);
    }

    createEvent(args) {
        const userId = args.userId
        const userAlias = args.userAlias
        if (_.isUndefined(userId) || _.isUndefined(userAlias))
          return Promise.reject(new Error('user required'))
      
        const capacity = Math.max(2, parseInt(args.capacity, 10) || 0)
      
        const whitelist = _.uniq(args.whitelist || [])
        const blacklist = _.uniq(args.blacklist || [])
        if (_.indexOf(whitelist, userId) !== -1 ||
            _.indexOf(blacklist, userId) !== -1 ||
            !_.isEmpty(_.intersection(whitelist, blacklist)))
          return Promise.reject(new Error('invalid whitelist/blacklist'))
      
        const perUserTimeoutSec = Math.max(1, parseInt(args.perUserTimeoutSec, 10) || 30)
      
        const params = args.params || ''
        if (!_.isString(params))
          return Promise.reject(new Error('invalid params'))
      
        const event = {
          id: shortid(),
          capacity,
          params: _.trim(params),
          whitelist,
          blacklist,
          userIds: [userId],
          aliases: [userAlias]
        }
      
        return redis.createEvent(`events/${event.id}`, pendingKey, JSON.stringify(event)).then(() => {
          const timeout = event.capacity * perUserTimeoutSec * 1000
          setTimeout(function autoCancelEvent() {
            cancelEvent(userId, event.id).catch(err => {
              // Just eat this error since it's an automatic cancellation or expiration;
              // not a user action.
              //
              // console.warn('cannot auto-cancel event %s: %s', event.id, err.message)
            })
          }, timeout)
          return event
        })
    }
      
    autojoinEvent(args) {
        const userId = args.userId
        const userAlias = args.userAlias
        if (_.isUndefined(userId) || _.isUndefined(userAlias))
          return Promise.reject(new Error('user required'))
      
        const capacity = Math.max(2, parseInt(args.capacity, 10) || 0)
      
        const params = args.params || ''
        if (!_.isString(params))
          return Promise.reject(new Error('invalid params'))
      
        return redis.autojoinEvent(
          pendingKey,
          activeKey,
          userId,
          userAlias,
          capacity,
          params,
          _.now() / 1000 | 0)
        .then(json => !json ? null : JSON.parse(json))
    }
      
    cancelEvent(userId, eventId) {
        return redis.cancelEvent(`events/${eventId}`, pendingKey, userId)
    }
      
    getEventsFor(userId) {
        return redis.getPendingEventsFor(pendingKey, userId).then(function (json) {
          this.pendingEvents = JSON.parse(json)
          return redis.getActiveEventsFor(activeKey, userId)
        }).then(function (json) {
          return {
            pending: this.pendingEvents,
            active: JSON.parse(json)
          }
        })
    }
      
    joinEvent(userId, userAlias, eventId) {
        return redis.joinEvent(`events/${eventId}`, pendingKey, activeKey,
          userId, userAlias, _.now() / 1000 | 0).then(JSON.parse)
    }

}

module.exports.init = () => {
    return new usn_mmc();
}