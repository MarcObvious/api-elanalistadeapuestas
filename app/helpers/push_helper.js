/**
 * Created by hadock on 29/09/15.
 */
var gcm         = require('node-gcm');
var settings    = require('../../config/settings');

var push_helper = {
    Android : {

    },
    Apple : {

    },
    SendOnePush : function(token,title,message,cb){
        if(!token)
            return cb('No device token',null);

        var message = new gcm.Message({
            collapseKey: "demo",
            priority: "high",
            contentAvailable: true,
            delayWhileIdle: true,
            timeToLive: 3,
            //restrictedPackageName: "somePackageName",
            dryRun: false,
            data: {
                "Nick": "Krainet",
                "From": "MQ1"
            },
            notification: {
                body: message,
                title: title,
                icon: "ic_launcher"
            }
        });

        var regIds = [];
        regIds.push(token);

        message.addData({
            key1: 'message1',
            key2: 'message2'
        });

        // Set up the sender with you API key
        var sender = new gcm.Sender(settings.push_key_gcm);
        sender.sendNoRetry(message, { registrationIds: regIds }, function(err, result) {
            return cb(err,result);
        });
    }
}

module.exports = push_helper;