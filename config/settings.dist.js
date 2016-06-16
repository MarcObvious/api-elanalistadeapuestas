var path       = require('path');

var settings = {
    appMode    : 'dev',
    path       : path.normalize(path.join(__dirname, '..')),
    port       : process.env.NODE_PORT || 3000,
    logsdir     : __dirname + '/../logs/access.log',

    api_prefix  : '/api'

};
module.exports = settings;