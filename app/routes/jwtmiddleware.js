/**
 * Created by ramon on 15/09/15.
 */
var jwt                 = require('jsonwebtoken');
var settings            = require('../../config/settings');
var _                   = require('lodash');
var helpers             = require('../controllers/_helpers.js')


module.exports = function (router) {

    // route middleware to verify a token
    router.use(function(req, res, next) {

        //console.log(req.baseUrl);
        var controller = req.baseUrl.replace(settings.api_prefix,'').substr(1);
        //console.log(controller);
        var method = req.method.toLowerCase();
        //console.log(method);
        var allowed_methods = settings.auth_perms[controller]?settings.auth_perms[controller].allow:[];
        //console.log(allowed_methods);


        if(allowed_methods.length>0 && _.contains(allowed_methods,method)){
            //If method is allowed in settings don't use JWT
            next();
        } else {

            // check header or url parameters or post parameters for token
            var token = req.body.token || req.query.token || req.headers['x-access-token'];

            // decode token
            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, settings.secret_jwt, function (err, decoded) {
                    if (err) {
                        return res.json({success: false, message: 'Failed to authenticate token.'});
                    } else {
                        // if everything is good, save to request for use in other routes

                        req.decoded = decoded;
                        next();
                    }
                });

            } else {

                // if there is no token
                // return an error
                return res.status(403).json(helpers.formatErrors(null,controller,req.method,'No token provided'));
            }
        }
    });
};



/*

// if user is found and password is right
// create a token
var token = jwt.sign(user, app.get('superSecret'), {
expiresInMinutes: 1440 // expires in 24 hours
});

 */

