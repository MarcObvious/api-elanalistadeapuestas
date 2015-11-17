/**
 * Created by Marc
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var MatchEvent = sequelize.define("MatchEvent", {
        minute: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        action: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        type: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        action_type: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        player: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        player_id_RF: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        action_icon: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        alias: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        team: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        player_img: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        deleted:    {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}
    },{
        classMethods : {
            associate : function(models){
                MatchEvent.belongsTo(models.Match);
                MatchEvent.belongsTo(models.Team);
                MatchEvent.belongsTo(models.Player);
            }
        }
    });
    return MatchEvent;

};