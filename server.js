var path        = require('path');
var express     = require('express');
var settings    = require('./config/settings');
var environment = require('./config/environment');
var colors      = require('colors');
var models      = require('./app/models');


module.exports.start = function (done) {
    var app_api = express();

    environment(app_api,'API');

    models.sequelize.sync().then(function() {
        app_api.listen(settings.port, function () {
            console.log( ("Api Analista listening on port " + settings.port).yellow );

            if (done) {

                return done(null, app, server);
            }
        }).on('error', function (e) {
            if (e.code == 'EADDRINUSE') {
                console.log('Address in use. Is the server already running?'.red);
            }
            if (done) {
                return done(e);
            }
        });
    });
};

// If someone ran: "node server.js" then automatically start the server
if (path.basename(process.argv[1],'.js') == path.basename(__filename,'.js')) {
    module.exports.start()
}
