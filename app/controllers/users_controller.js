var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var models          = require('../models');

var controller_name = 'users';

module.exports = {
    list: function (req, res, next) {
        models.User.findAll({
            include: [ models.Task ]
        }).then(function(users) {
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,users));
                });
    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'username', 'email','password');
        req.models.user.create(params, function (err, users) {
            if(err) {
                if(Array.isArray(err)) {
                    return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                } else {
                    return next(err);
                }
            }

            return res.status(200).json(helpers.formatResponse(controller_name,req.method,users.serialize()));
        });
    },
    get: function (req, res, next) {

        req.models.user.get(req.params.id,function (err, user) {
            if (err) {
                return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                return next(err);
            }
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,user.serialize()));
        });

    },
    put: function(req,res,next) {
        var params = _.pick(req.body, 'username', 'email','password');
        req.models.user.get(req.params.id,function (err, user) {
            if(err){
                return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                return next(err);
            }
            user.save(params);
        });
    },
    delete: function(req,res,next) {
        req.models.user.get(req.params.id,function (err, user) {
            user.remove(function(err){
                if(err){
                    return res.status(500).json(helpers.formatErrors(err,controller_name,req.method));
                }
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'item deleted'));
            })
        });
    }
};
