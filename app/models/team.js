/**
 * Created by Marc
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Team = sequelize.define("Team", {
        team_id_RF: {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        name: {type:DataTypes.STRING,allowNull:false,defaultValue:""},
        name_abbr: {type:DataTypes.STRING,allowNull:false,defaultValue:""},
        shield: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        deleted:    {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}

    },{
        classMethods : {
            associate : function(models){
                Team.hasMany(models.Player);
                Team.belongsTo(models.Lliga);
                Team.belongsToMany(models.Temp, {through:'team_temp'});
            }
        }
    });
    return Team;


};