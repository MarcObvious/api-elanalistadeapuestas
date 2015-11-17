/**
 * Created by Marc
 */
"use strict";

module.exports = function(sequelize, DataTypes) {
    var Classificacio = sequelize.define("Classificacio", {
        temp:       {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        team:       {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        points:     {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        wins:       {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        draws:      {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        losses:     {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        gf:         {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        ga:         {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        avg:        {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        mark:       {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        round:      {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
        pos:        {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
        shield:     {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        form:       {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        direction:  {type:DataTypes.STRING,allowNull:true,defaultValue:""},
        deleted:    {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:false}

    },{
        classMethods : {
        }
    });
    return Classificacio;
};