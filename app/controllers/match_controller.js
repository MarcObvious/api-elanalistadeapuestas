var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');

var controller_name = 'match';

var Match = models.Match;
var Lineup = models.Lineup;
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

        var id = req.params.id ? req.params.id : null;
        var year = req.params.year ? req.params.year : null;
        var round = (req.params.round && req.params.round != 0) ? req.params.round : null;
        var competition = req.params.competition  ? req.params.competition : null;
        var team = req.params.team ? req.params.team : null;

        //Doesn't work yet
        if(year  && competition && round && team){
            /*Match.findAll({
                include: [{all: true}],
                where: {
                    temp: year,
                    lliga: competition,
                    round: round
                }}).then(function(shop) {

            });*/

            return res.status(200).json(helpers.formatResponse(controller_name,req.method,'Nope, doesnt work'));
        }
        if (competition == 0){
            competition = [1,8,10];
        }
        if (year == 0) {
            year = [2013,2014,2015]
        }

        if(year && competition && round && team){

            Match.findAll({
                where: {
                    $and: [
                        {temp: year},
                        {lliga: competition},
                        {round: round},
                        {$or: [{local: {$like: '%'+team+'%'}}, {visitor:{$like:'%'+team+'%'}}]}
                    ]

        }}).then(function(matchs) {
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,matchs));
            });
        }
        else if(year && competition && team){

            Match.findAll({
                where: {
                    $and: [
                        {temp: year},
                        {lliga: competition},
                        {$or: [{local: {$like: '%'+team+'%'}}, {visitor:{$like:'%'+team+'%'}}]}
                    ]

                }}).then(function(matchs) {
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,matchs));
            });
        }
        else if(year && competition){
            Match.findAll({
                where: {
                    temp: year,
                    lliga: competition
                }}).then(function(matchs) {
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,matchs));
            });
        }
        else if(id){
            Match.findOne({
                include: [{all: true}],
                    where: {id: id}
            }).then(function(match) {
                return res.status(200).json(helpers.formatResponse(controller_name,req.method,match));
            });
        }
        else{
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
        }
    },
    //No puts, no deletes
    put: function(req,res,next) {
        /*  var params = _.pick(req.body, 'shop_name', 'value');
         return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));*/
    },
    delete: function(req,res,next) {
        // return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    }
};
