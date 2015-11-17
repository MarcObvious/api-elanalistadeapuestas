/**
 * Created by Marc
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Player = sequelize.define("Player", {
        alias: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        id_RF: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        image: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        last_name: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        name: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        nick: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        num: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        deleted:    {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}
    },{
        classMethods : {
            associate : function(models){
                Player.hasMany(models.Lineup);
                Player.belongsTo(models.Team);
                Player.belongsToMany(models.Temp, {through:'player_temps'});
            }
        }
    });
    return Player;

};