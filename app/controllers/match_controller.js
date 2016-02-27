var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');

var controller_name = 'match';

var Match = models.Match;
var Team = models.Team;
var MatchExtra = models.MatchExtra;

module.exports = {
    list: function (req, res, next) {
        /*Match.findAll({
         include: [],
         attributes: ['shop_name', 'value']
         }).then(function(nshop) {
         return res.status(200).json(helpers.formatResponse(controller_name,req.method,nshop));
         });*/

    },
    create: function (req, res, next) {
        var params = _.pick(req.body, 'match_id_RF','lliga', 'temp', 'match_id','league_id_RF','competition_name','date','coef','team1','team2','extraTxt','group','group_code','hour','live_minute','local','local_abbr',
            'local_goals','local_shield','minute','no_hour','numc','penaltis1','penaltis2','playoffs','prorroga','result','round','schedule','status','team1_RF','team2_RF','total_group','visitor','visitor_abbr','visitor_goals','visitor_shield','winner');

        var local = 0;
        var visitant = 0;
        if(params){
            async.waterfall([
                function (next) {
                    Team.update({name_abbr: params.local_abbr, shield: params.local_shield}, {where: {team_id_RF: params.team1_RF}})
                        .then(function(){
                            next();
                        })
                        .error(function(){});
                },
                function (next) {
                    Team.findOne({
                        where: {team_id_RF: params.team1_RF},
                        attributes: ['id']
                    }).then(function(team) {
                        params.localId = team.id;
                        next();
                    });
                },
                function (next) {
                    Team.update({name_abbr: params.visitor_abbr, shield: params.visitor_shield}, {where: {team_id_RF: params.team2_RF}})
                        .then(function(){
                            next();
                        })
                        .error(function(){});
                },
                function (next) {
                    Team.findOne({
                        where: {team_id_RF: params.team2_RF},
                        attributes: ['id']
                    }).then(function(team) {
                        params.visitorId = team.id;
                        next();
                    });
                },
                function (next) {
                    Match
                        .findOrCreate({where: {match_id_RF: params.match_id_RF, lliga: params.lliga, temp: params.temp}, defaults: params})
                        .spread(function(match, created3) {

                            MatchExtra
                                .findOne({where:{MatchId:match.id}}).then(function(result){
                                if (!result) {
                                    return res.status(200).json(helpers.formatResponse(controller_name, req.method, {id :match.id, local_id:params.localId, visitant_id:params.visitorId}));
                                }
                                else {
                                    return res.status(200).json(helpers.formatResponse(controller_name, req.method, 'creat'));
                                }
                            });
                        });
                }
            ], function (err, result) {
                if (err) {
                    console.log('ERROR'.red);
                    return err;
                } else {
                    console.log('All inserted OK'.yellow);
                    return result;
                }
            });



        }
    },
    get: function (req, res, next) {

        var searchname = req.params.searchname ? req.params.searchname : null;
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
        }
    },
    put: function(req,res,next) {
        /*  var params = _.pick(req.body, 'shop_name', 'value');
         return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));*/
    },
    delete: function(req,res,next) {
        // return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    }
};
