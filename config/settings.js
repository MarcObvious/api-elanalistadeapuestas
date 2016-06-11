var path       = require('path');

var settings = {
    appMode    : 'dev',
    path       : path.normalize(path.join(__dirname, '..')),
    port       : process.env.NODE_PORT || 3000,
    logsdir     : __dirname + '/../logs/access.log',
    secret_jwt  : "crypt_key123",
    //JSON web tokens permissions
    auth_perms  : {
        "users" : {
            disallow : [],
            allow    : ["post","get","put","delete"]
        },
        "customers" : {
            disallow : [],
            allow    : ["post","get","put","delete"]
        },
        "devicetokens" : {
            disallow : [],
            allow    : ["post","get","put","delete"]
        },
        "auth" : {
            disallow : [],
            allow    : ["post","get","put","delete"]
        },
        "segments" : {
            disallow : [],
            allow    : ["post","get","put","delete"]
        },
        "schedullers" : {
            disallow : [],
            allow    : ["post","get","put","delete"]
        },
        "platforms" : {
            disallow : [],
            allow    : ["post","get","put","delete"]
        },
        "pushlauncher" : {
            disallow : [],
            allow    : ["post","get"]
        },
        "classificacio" : {
            disallow : [],
            allow    : ["post","get","put","options"]
        },
        "table" : {
            disallow : [],
            allow    : ["post","get","put","options"]
        },
        "match" : {
            disallow : [],
            allow    : ["post","get","put","options"]
        },
        "matchextra" : {
            disallow : [],
            allow    : ["post","get","put","options"]
        },
        "all" : {
            disallow : [],
            allow    : ["post","get","put","options"]
        }
    },
    api_prefix  : '/api',
    //mq1   push_key_gcm: 'AIzaSyB6ecfFxTGLxl3zefruWWLDLS8q4p_EG1Y',
    push_key_gcm: 'AIzaSyBCtLvarL6rik5XMN-qskfRM5YvBsyW93s',
    push_key_ios: 'certificate.cer'
};
module.exports = settings;