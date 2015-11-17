var path              = require('path');
var express           = require('express');
var settings          = require('./settings');
var models            = require('../app/models/');
var bodyParser        = require('body-parser');
var logger            = require('morgan');
var methodOverride    = require('method-override');
var applicationRouter = require('../app/routes/');
var fs                = require('fs');
var favicon           = require('serve-favicon');

module.exports = function (app) {

    var accessLogStream = fs.createWriteStream(settings.logsdir, {flags: 'a'});
    app.use(logger('dev', {stream: accessLogStream}));
    app.use(express.static(path.join(settings.path, 'public')));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(favicon(__dirname + '/../public/favicon.ico'));

    app.set('views', path.join(__dirname, '../app/views'));
    app.set('view engine', 'jade');

    app.use(methodOverride());

    //CORS
    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.set('');

    applicationRouter(app);


};
