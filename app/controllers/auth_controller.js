/**
 * Created by hadock on 15/09/15.
 */
var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var jwt             = require('jsonwebtoken');

var controller_name = 'auth';


module.exports = {
    list: function (req, res, next) {

    },
    create: function (req, res, next) {
        if((req.body.email||req.body.username) && req.body.password){
            req.models.user.find({or:[{email: req.body.email}, {username: req.body.username}],password:req.body.password},function(err,user){
                if(user){
                    var token = jwt.sign(user, settings.secret_jwt, {
                        expiresInMinutes: 1 // expires in 24 hours
                    });
                }

                if(err)
                    return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                else
                    return res.status(200).json(helpers.formatResponse(controller_name,req.method,helpers.mapResults(user),null,token));
            });
        }else{
            return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Parameters missing'));
        }
    },
    get: function (req, res, next) {
        req.models.customer.get(req.params.id,function (err, customer) {
            if(err) return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,customer.serialize()));
        });

    }
};
