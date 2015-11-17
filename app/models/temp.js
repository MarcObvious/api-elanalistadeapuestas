/**
 * Created by Marc
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Temp = sequelize.define("Temp", {
        year:       {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        deleted:    {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}

    },{
        classMethods : {
            associate : function(models){
                Temp.belongsToMany(models.Lliga, {through:'lliga_temp'});
                Temp.belongsToMany(models.Team, {through:'team_temp'});
            }
        }
    });
    return Temp;


};