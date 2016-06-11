var settings = require('../../config/settings');

//API ROUTES
var auth_routes         = require('./api_auth');
var user_routes         = require('./api_users');

//ANALISTA ROUTES
var classificacio_routes = require('./api_classificacio');
var table_routes = require('./api_table');
var match_routes = require('./api_match');
var matchextra_routes = require('./api_matchextra');
var all_routes = require('./api_all');

//WEB ROUTES
var home_routes = require('./web_home');


module.exports = function (app) {

    //Api routes
    app.use(settings.api_prefix+'/auth',auth_routes);
    app.use(settings.api_prefix+'/users',user_routes);
    app.use(settings.api_prefix+'/classificacio',classificacio_routes);
    app.use(settings.api_prefix+'/table',table_routes);
    app.use(settings.api_prefix+'/match',match_routes);
    app.use(settings.api_prefix+'/matchextra',matchextra_routes);
    app.use(settings.api_prefix+'/all',all_routes);

    //Web routes
    app.use('/',home_routes);
}