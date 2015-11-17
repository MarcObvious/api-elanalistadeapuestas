/**
 * Created by Marc
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Lineup = sequelize.define("Lineup", {
        alias: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        goals: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        idplayer_RF: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        image: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        last_name: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        name: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        nick: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        num: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        pos: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        reds: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        role: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        year: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        yellows: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        deleted:    {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}
    },{
        classMethods : {
            associate : function(models){
                Lineup.belongsTo(models.Match);
                Lineup.belongsTo(models.Team);
                Lineup.belongsTo(models.Player)
            }
        }
    });
    return Lineup;

};