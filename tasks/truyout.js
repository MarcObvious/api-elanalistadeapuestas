var Sequelize   = require('sequelize');
var models      = require('../app/models/');
var async       = require('async');
var colors      = require('colors');
var crypto      = require('crypto');


models.sequelize.sync({force:true,omitNull:true}).then(function() {


    var temps = [{"year":"2013"},{"year":"2014"},{"year":"2015"},{"year":"2016"}];
    var lligues = [
        {"name":"BBVA","total_teams":20, id_RF:1,"total_jornades":39, TempId:1},
        {"name":"Premier","total_teams":20,id_RF:10, "total_jornades":39, TempId:1},
        {"name":"Bundesliga","total_teams":20,id_RF:8, "total_jornades":39, TempId:1}
    ];
    var teams = [
        {"name":"Barça", "LligaId":"1"},
        {"name":"Madrid", "LligaId":"1"},
        {"name":"Arsenal", "LligaId":"8"}
    ];



    async.waterfall([
        function (next) {
            models.Temp.bulkCreate(temps)
                .then(function () {
                        next();
                    }
                );
        },
        function (next) {
            models.Lliga.bulkCreate(lligues)
                .then(function () {
                    models.Temp.findAll()
                        .then(function(temps){
                            temps.forEach(function (temp) {
                                temp.addLliga([1,2,3]);
                            });
                            next();
                        });

                    }
                );
        },
        /*function (next) {
            models.Team.bulkCreate(teams)
                .then(function () {
                        models.Temp.findAll()
                            .then(function(temps){
                                temps.forEach(function (temp) {
                                    temp.addTeam([1,2,3]);
                                });
                                next();
                            });

                    }
                );
        },*/
    ], function (err, result) {
        if (err) {
            console.log('ERROR'.red);
            return err;
        } else {
            console.log('All inserted OK'.yellow);
            return result;
        }
    });

});