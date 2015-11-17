/**
 * Created by Marc
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Lliga = sequelize.define("Lliga", {
        name:       {type:DataTypes.STRING,allowNull:false,defaultValue:"", unique:"true"},
        id_RF:      {type:DataTypes.INTEGER,allowNull:false,defaultValue:0, unique:"true"},
        total_teams: {type:DataTypes.STRING,allowNull:false,defaultValue:""},
        total_jornades: {type:DataTypes.STRING,allowNull:false,defaultValue:""},
        deleted:    {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}
    },{
        classMethods : {
            associate : function(models){
                Lliga.belongsToMany(models.Temp, {through:'lliga_temp'});
                Lliga.hasMany(models.Team);
            }
        }
    });
    return Lliga;
};