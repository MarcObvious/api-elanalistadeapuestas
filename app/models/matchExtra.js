/**
 * Created by Marc
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var MatchExtra = sequelize.define("MatchExtra", {
        address: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        basealias1: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        basealias2: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        attendance:{type:DataTypes.STRING,allowNull:true,defaultValue:""},
        bet: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        category_id: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        chairman_local: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        chairman_visitor: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        channels: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        competition_logo: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        datateam1: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        datateam2:  {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        extra_data: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        fans: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        forecast: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        group_code: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        img_stadium: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        isLineup: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        isLive: {type:DataTypes.BOOLEAN,allowNull:true,defaultValue:false},
        isReport: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        isWall: {type:DataTypes.BOOLEAN,allowNull:true,defaultValue:false},
        league: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        league_id_RF: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        live_minute: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        local_coach: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        local_goals: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        no_hour: {type:DataTypes.BOOLEAN,allowNull:true,defaultValue:false},
        numc: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        pen1: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        pen2: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        playoffs: {type:DataTypes.BOOLEAN,allowNull:true,defaultValue:false},
        progression: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        prorroga: {type:DataTypes.BOOLEAN,allowNull:true,defaultValue:false},
        quiniela_forecast: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        referee: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        result: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        round: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        schedule:{type:DataTypes.DATE,allowNull:true,defaultValue:0},
        seats: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        size: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        team1_stats: {type:DataTypes.TEXT,allowNull:true,defaultValue:""},
        team2_stats: {type:DataTypes.TEXT,allowNull:true,defaultValue:""},
        match_stats: {type:DataTypes.TEXT,allowNull:true,defaultValue:""},
        events: {type:DataTypes.TEXT,allowNull:true,defaultValue:""},
        squad: {type:DataTypes.TEXT,allowNull:true,defaultValue:""},
        stadium: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        status: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        team1_RF: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        team2_RF: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        temperature: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        total_group: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        total_rounds: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        typefield: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        visitor_coach: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        visitor_goals: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        weather: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        winner: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        year: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        yearBuilt: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        deleted:    {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}
    },{
        classMethods : {
            associate : function(models){
                MatchExtra.belongsTo(models.Match);
                MatchExtra.belongsTo(models.Team, {as: 'local_'});
                MatchExtra.belongsTo(models.Team, {as: 'visitor_'});
            }
        }
    });
    return MatchExtra;
};
