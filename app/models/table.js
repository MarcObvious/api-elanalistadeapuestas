/**
 * Created by Marc
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Table = sequelize.define("Table", {
        team_id_RF:{type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        round: {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        team: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        wins: {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        losses: {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        draws: {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        ga: {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        gf: {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        avg: {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        conference: {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        direction: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        form: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        group: {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        mark: {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        points: {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        pos: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        shield: {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        deleted:    {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}

    },{
        classMethods : {
            associate : function(models) {
                Table.belongsTo(models.Team);
                Table.belongsTo(models.Temp);
            }
        }
    });
    return Table;


};