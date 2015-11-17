var settings = require('../../config/settings');

var _       = require('lodash');
var helpers = require('./_helpers');

module.exports = {
    list: function (req, res, next) {
        res.render('home', { title: 'Hey', message: 'Hello there!'});
    }
};




/*
Empty controller template
 res.render('test_jade',{ title: 'Hey', message: 'Hello there!'});

module.exports = {
    list: function (req, res, next) {
    },
    create: function (req, res, next) {
    },
    get: function (req, res, next) {
    },
    put: function(req,res,next) {
    },
    delete: function(req,res,next) {
    }
};*/
