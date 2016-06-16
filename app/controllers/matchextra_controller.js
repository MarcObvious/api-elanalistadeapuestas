var _               = require('lodash');
var helpers         = require('./../helpers/responseHelper');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');

var controller_name = 'match';

var MatchExtra = models.MatchExtra;
var MatchStat = models.MatchStat;
var Lineup = models.Lineup;
var Player = models.Player;
var Event = models.MatchEvent;

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
        var params = _.pick(req.body, 'MatchId','local_id','visitant_id', 'basealias1', 'basealias2', 'attendance', 'bet', 'category_id', 'chairman_local', 'chairman_visitor', 'channels', 'competition_logo', 'datateam1', 'datateam2', 'extra_data', 'fans', 'forecast', 'group_code',
            'img_stadium', 'isLineup', 'isLive', 'isReport', 'isWall',  'league', 'league_id_RF', 'live_minute',  'local_coach', 'local_goals',  'no_hour', 'numc', 'pen1', 'pen2', 'playoffs', 'progression', 'prorroga', 'quiniela_forecast',  'referee', 'result',
            'round', 'schedule', 'seats', 'size', 'lineups', 'match_stats','squad', 'team1_stats', 'team2_stats', 'events', 'stadium', 'status', 'team1_RF', 'team2_RF', 'temperature', 'total_group', 'total_rounds', 'typefield', 'visitor_coach', 'visitor_goals',  'weather', 'winner', 'yearBuilt'
        );


        if(params){
            // console.log("PUTAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            //console.log(params);
            MatchExtra
                .findOrCreate({where: {MatchId: params.MatchId}, defaults: {MatchId: params.MatchId, localId : params.local_id, visitorId: params.visitant_id,basealias1:params.basealias1, basealias2:params.basealias2, attendance:params.attendance, bet:JSON.stringify(params.bet), category_id:params.category_id, chairman_local:params.chairman_local, chairman_visitor:params.chairman_visitor, channels: JSON.stringify(params.channels), competition_logo:params.competition_logo, datateam1:params.datateam1, datateam2:params.datateam2, extra_data: JSON.stringify(params.extra_data), fans:params.fans, forecast: JSON.stringify(params.forecast), group_code:params.group_code,
                    img_stadium:params.img_stadium, isLineup:params.isLineup, isLive:params.isLive, isReport:params.isReport, isWall:params.isWall, league:params. league,league_id_RF :params.league_id_RF, live_minute:params.live_minute,local_coach :params. local_coach,local_goals: params.local_goals,no_hour :params. no_hour, numc:params.numc, pen1:params.pen1, pen2:params.pen2, playoffs:params.playoffs, progression:JSON.stringify(params.progression), prorroga:params.prorroga, quiniela_forecast: JSON.stringify(params.quiniela_forecast),referee :params. referee, result:params.result,
                    round:params.round, schedule:params.schedule, seats:params.seats, size:params.size,match_stats :JSON.stringify(params.match_stats), events :JSON.stringify(params.events), squad :JSON.stringify(params.squad), team1_stats :JSON.stringify(params.team1_stats), team2_stats :JSON.stringify(params.team2_stats),stadium:params.stadium, status:params.status,team1_RF :params.team1_RF, team2_RF:params.team2_RF, temperature:params.temperature,total_group :params.total_group, total_rounds: params.total_rounds, typefield: params.typefield, visitor_coach: params.visitor_coach, visitor_goals:params.visitor_goals, weather:params. weather, winner:params.winner, yearBuilt:params.yearBuilt}})
                .spread(function(matchextra, created) {

                    async.waterfall([
                        function (next) {
                            var done = 0;
                            if(params.lineups.local && params.lineups.local != null && params.lineups.local.length > 0) {
                                async.forEach(params.lineups.local, function (lineup, callback) {
                                    delete lineup.id;
                                    Player
                                        .findOrCreate({
                                            where: {id_RF: lineup.idplayer, TeamId: params.local_id},
                                            defaults: {
                                                id_RF: lineup.idplayer,
                                                TeamId: params.local_id,
                                                alias: lineup.alias,
                                                image: lineup.image,
                                                last_name: lineup.last_name,
                                                name: lineup.name,
                                                nick: lineup.nick,
                                                num: lineup.num
                                            }
                                        })
                                        .spread(function (player, creat) {
                                            var doit = function () {
                                                Lineup
                                                    .findOrCreate({
                                                        where: {
                                                            MatchId: params.MatchId,
                                                            TeamId: params.local_id,
                                                            PlayerId: player.id
                                                        }, defaults: lineup
                                                    })
                                                    .spread(function (lineupp, crea) {
                                                        ++done;
                                                        if (done === params.lineups.local.length) {
                                                            next()
                                                        }
                                                        else {
                                                            callback();
                                                        }
                                                    });
                                            };
                                            if (!creat) {
                                                Player.update(
                                                    {
                                                        id_RF: lineup.idplayer,
                                                        TeamId: params.local_id,
                                                        alias: lineup.alias,
                                                        image: lineup.image,
                                                        last_name: lineup.last_name,
                                                        name: lineup.name,
                                                        nick: lineup.nick,
                                                        num: lineup.num
                                                    },
                                                    {where: {id: player.id}})
                                                    .then(function () {
                                                        doit();
                                                    });
                                            }
                                            else {
                                                doit();
                                            }

                                        });
                                });
                            }
                            else {
                                next();
                            }

                        },

                        function (next) {
                            var done = 0;
                            if (params.lineups.visitor && params.lineups.visitor != null && params.lineups.visitor.length > 0) {
                                async.forEach(params.lineups.visitor, function (lineup, callback) {
                                    delete lineup.id;
                                    Player
                                        .findOrCreate({
                                            where: {id_RF: lineup.idplayer, TeamId: params.visitant_id},
                                            defaults: {
                                                id_RF: lineup.idplayer,
                                                TeamId: params.visitant_id,
                                                alias: lineup.alias,
                                                image: lineup.image,
                                                last_name: lineup.last_name,
                                                name: lineup.name,
                                                nick: lineup.nick,
                                                num: lineup.num
                                            }
                                        })
                                        .spread(function (player, creat) {
                                            var doit = function () {
                                                Lineup
                                                    .findOrCreate({
                                                        where: {
                                                            MatchId: params.MatchId,
                                                            TeamId: params.visitant_id,
                                                            PlayerId: player.id
                                                        }, defaults: lineup
                                                    })
                                                    .spread(function (lineupp, crea) {
                                                        ++done;
                                                        if (done === params.lineups.visitor.length) {
                                                            next()
                                                        }
                                                        else {
                                                            callback();
                                                        }
                                                    });
                                            };
                                            if (!creat) {
                                                Player.update(
                                                    {
                                                        id_RF: lineup.idplayer,
                                                        TeamId: params.visitant_id,
                                                        alias: lineup.alias,
                                                        image: lineup.image,
                                                        last_name: lineup.last_name,
                                                        name: lineup.name,
                                                        nick: lineup.nick,
                                                        num: lineup.num
                                                    },
                                                    {where: {id: player.id}})
                                                    .then(function () {
                                                        doit();
                                                    });
                                            }
                                            else {
                                                doit();
                                            }

                                        });
                                });
                            }
                            else {
                                next();
                            }

                        },
                        function (next) {
                            if(params.match_stats && params.match_stats != null && params.match_stats.length > 0){
                                var done = 0;
                                async.forEach(params.match_stats, function(matchst, callback){
                                    MatchStat
                                        .findOrCreate({where:{MatchId: params.MatchId, type:matchst.type, localId:params.local_id, visitorId:params.visitant_id}, defaults:matchst})
                                        .spread(function(matc, crea){
                                            ++done;
                                            if (done === params.match_stats.length){
                                                next()
                                            }
                                            else {
                                                callback();
                                            }

                                        });
                                });

                            }
                            else {
                                next();
                            }
                        },
                        //
                        function (next) {
                            if(params.events) {
                                var done = 0;

                                for (var ev in params.events) {
                                    async.forEach(params.events[ev], function (event, callback) {
                                        Player
                                            .findOrCreate({
                                                where: {id_RF: event.player_id},
                                                defaults: {id_RF: event.player_id, alias:event.alias, nick:event.player, TeamId: event.team == 'local' ? params.local_id : params.visitant_id}
                                            }).spread(function (player) {

                                            Event
                                                .findOrCreate({
                                                    where: {
                                                        MatchId: params.MatchId,
                                                        TeamId: event.team == 'local' ? params.local_id : params.visitant_id,
                                                        PlayerId: player.id,
                                                        minute: event.minute,
                                                        type: ev,
                                                        action: event.action,
                                                        action_type: event.action_type,
                                                        player: event.player,
                                                        player_id_RF: event.player_id,
                                                        action_icon: event.action_icon,
                                                        alias: event.alias,
                                                        team: event.team,
                                                        player_img: event.player_img
                                                    },
                                                    defaults: {
                                                        MatchId: params.MatchId,
                                                        TeamId: event.team == 'local' ? params.local_id : params.visitant_id,
                                                        PlayerId: player.id,
                                                        minute: event.minute,
                                                        type: ev,
                                                        action: event.action,
                                                        action_type: event.action_type,
                                                        player: event.player,
                                                        player_id_RF: event.player_id,
                                                        action_icon: event.action_icon,
                                                        alias: event.alias,
                                                        team: event.team,
                                                        player_img: event.player_img
                                                    }
                                                })
                                                .spread(function (matc, crea) {
                                                        callback();
                                                });
                                        });
                                    });

                                }


                            }
                            next();

                        }

                    ], function (err, result) {
                        if (err) {
                            console.log('ERROR'.red);
                            return res.status(500).json(helpers.formatResponse(controller_name, req.method, 'ERROR'));
                        } else {
                            console.log('All inserted OK'.yellow);
                            return res.status(200).json(helpers.formatResponse(controller_name, req.method, 'OK'));
                        }
                    });


                });


        }
    },
    get: function (req, res, next) {
        return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    },
    put: function(req,res,next) {
        /*  var params = _.pick(req.body, 'shop_name', 'value');
         return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));*/
    },
    delete: function(req,res,next) {
        // return res.status(200).json(helpers.formatResponse(controller_name,req.method,null,'Empty'));
    }
};
