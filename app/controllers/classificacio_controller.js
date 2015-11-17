var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');

var controller_name = 'classificacio';

var Classificacio = models.Classificacio;

module.exports = {
    list: function (req, res, next) {
        Classificacio.findAll({
            include: [],
            //attributes: ['shop_name', 'value']
        }).then(function(nshop) {
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,nshop));
        });

    },
    create: function (req, res, next) {
        /*var params = _.pick(req.body, 'shop_name','value');

        if(params.shop_name && params.value){
            Nshop
                .findOrCreate({where: {shop_name: params.shop_name}, defaults: {value: params.value}})
                .spread(function(nshop, created) {
                    if(created)
                        return res.status(200).json(helpers.formatResponse(controller_name,req.method,nshop));
                    else
                        return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Shop allready exist!'));
                });
        }*/
    },
    get: function (req, res, next) {
       /* var searchname = req.params.searchname ? req.params.searchname : null;
        var getId = req.params.id ? req.params.id : null;

        if(searchname){
            Nshop.findOne({ where: {shop_name: searchname}}).then(function(shop) {
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,shop));
            });
        }
        else if(getId){
            Nshop.findOne({ where: {id: getId}}).then(function(shop) {
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,shop));
            });
        }
        else{
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
        }*/
    },
    put: function(req,res,next) {
      /*  var params = _.pick(req.body, 'shop_name', 'value');
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));*/
    },
    delete: function(req,res,next) {
       // return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    }
};
