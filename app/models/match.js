/**
 * Created by Marc
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Match = sequelize.define("Match", {
        lliga: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        temp: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        match_id_RF: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        league_id_RF: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        competition_name: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        date: {type:DataTypes.DATE,allowNull:true},
        coef: {type:DataTypes.FLOAT,allowNull:true,defaultValue:0},
        team1: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        team2: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        extraTxt: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        group: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        group_code: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        hour: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        id_resultados: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        live_minute: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        local: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        local_abbr: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        local_goals: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        local_shield: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        minute: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        no_hour: {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false},
        numc: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        penaltis1: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        penaltis2: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        playoffs: {type:DataTypes.BOOLEAN,allowNull:true,defaultValue:false},
        prorroga: {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false},
        result: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        round: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        schedule: {type:DataTypes.DATE,allowNull:true},
        status: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        team1_RF: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        team2_RF: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        total_group: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        visitor: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        visitor_abbr: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        visitor_goals: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        visitor_shield: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        winner: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        deleted:    {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}

    },{
        classMethods : {
            associate : function(models){
                Match.hasOne(models.MatchExtra,{as: 'match_id'});
                Match.hasMany(models.MatchStat,{as: 'match_id'});
                Match.hasMany(models.Lineup,{as: 'match_id'});
                Match.belongsTo(models.Team, {as: 'local_'});
                Match.belongsTo(models.Team, {as: 'visitor_'});
            }
        }
    });
    return Match;
};