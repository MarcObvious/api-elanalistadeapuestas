var path       = require('path');

var settings = {
    path       : path.normalize(path.join(__dirname, '..')),
    port       : process.env.NODE_PORT || 3000,
    database   : {
        protocol : "mysql",
        host     : "127.0.0.1",
        database : "your_database",
        user     : "your_user",
        password : "your_password",
        query    : {
            pool : false, //CACHE querys
            debug: true
        }
    },
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
            allow    : ["post","get","put","delete"]
        }
    },
    api_prefix  : '/api',
    push_key_gcm: 'AIzaSyB6ecfFxTGLxl3zefruWWLDLS8q4p_EG1Y',
    push_key_ios: 'certificate.cer'
};
module.exports = settings;
