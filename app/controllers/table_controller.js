var _               = require('lodash');
var helpers         = require('./_helpers');
var settings        = require('../../config/settings');
var async           = require('async');
var models          = require('../models');

var controller_name = 'table';

var Table = models.Table;
var Team =  models.Team;
var Temp = models.Temp;

module.exports = {
    list: function (req, res, next) {
        Table.findAll({
            include: [],
            //attributes: ['shop_name', 'value']
        }).then(function(table) {
            return res.status(200).json(helpers.formatResponse(controller_name,req.method,table));
        });

    },
    create: function (req, res, next) {

        var params = _.pick(req.body,'id','temp','lliga','team','points','wins','draws','losses','gf','ga','avg','mark','round','pos','shield','form','direction');
        params.team_id_RF = params.id;
        var temporada = 1;
        if (params.temp == '2013') {
            temporada = 1;
        }
        else if (params.temp == '2014') {
            temporada = 2;
        }
        else if (params.temp == '2015') {
            temporada = 3;
        }
        else {
            temporada = 4;
        }

        var lliga = 1;
        if (params.lliga == '10') {
            lliga = 2;
        }
        else if (params.lliga == '8'){
            lliga = 3;
        }


       // console.log(params);
        Team
            .findOrCreate({where: {team_id_RF: params.team_id_RF}, defaults: {team_id_RF: params.team_id_RF, temp: params.temp, name: params.team, name_abbr: "", shield: "", LligaId:lliga}})
            .spread(function(team, created) {
                if (created)
                    console.log("Team Created:" + team.name);

                Temp.findByPrimary(temporada)
                    .then(function(temp){
                        temp.addTeam(team.id);

                        Table
                            .findOrCreate({where:{team_id_RF: params.team_id_RF, round:params.round, TempId: temporada},defaults: {team_id_RF: params.team_id_RF,team:params.team,points:params.points,wins:params.wins,draws:params.draws,losses:params.losses,gf:params.gf,ga:params.ga,avg:params.avg,mark:params.mark,round:params.round,pos:params.pos,shield:params.shield,form:params.form,direction:params.direction, TeamId:team.id, TempId: temporada}})
                            .then(function(table, created) {
                                if(table)
                                    return res.status(200).json(helpers.formatResponse(controller_name,req.method, 'tot OK!'));
                                else
                                    return res.status(500).json(helpers.formatErrors(null,controller_name,req.method,'Error Creating'));
                            });
                    });

            });




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
