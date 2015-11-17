/**
 * Created by Marc
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var MatchStat = sequelize.define("MatchStat", {
        local: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        title: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        type: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        visitor: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        deleted:    {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}

    },{
        classMethods : {
            associate : function(models){
                MatchStat.belongsTo(models.Match);
                MatchStat.belongsTo(models.Team, {as: 'local_'});
                MatchStat.belongsTo(models.Team, {as: 'visitor_'});
            }
        }
    });
    return MatchStat;
};